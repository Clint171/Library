const API_URL = "http://localhost:3000";

// Show only the selected section
function showSection(sectionId) {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Fetch and display books with availability tags
async function fetchBooks() {
    const response = await fetch(`${API_URL}/books`);
    const books = await response.json();
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        const statusClass = book.status == "available" ? "available" : "borrowed";
        const statusText = book.status == "available" ? "Available" : "Borrowed";

        bookList.innerHTML += `
            <li>
                ${book.title} by ${book.author}
                <span class="tag ${statusClass}">${statusText}</span>
            </li>
        `;
    });
}

// Add a book
async function addBook() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author })
    }).then(()=>{
        loadBooks();
    });
}

// Borrow a book
async function borrowBook() {
    const bookId = document.getElementById("borrowBookSelect").value;
    const borrower = document.getElementById("borrowerName").value;

    await fetch(`${API_URL}/books/${bookId}/borrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrower })
    });

    loadBooks();
}

// Return a book
async function returnBook() {
    const bookId = document.getElementById("returnBookSelect").value;

    await fetch(`${API_URL}/books/${bookId}/return`, {
        method: "POST"
    });

    loadBooks();
}

// View a book's history
async function viewHistory() {
    const bookId = document.getElementById("historyBookSelect").value;
    const response = await fetch(`${API_URL}/books/${bookId}`);
    const history = await response.json();

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "<h2>Borrowing History</h2>";
    history.lendings.forEach(entry => {
        historyList.innerHTML += `
            <li>${entry.borrower} borrowed on ${entry.borrowed_at}, 
            returned on ${entry.returned_at || "Not yet returned"}</li>`;
    });
}

// View a borrower's history
async function viewBorrowerHistory() {
    const borrowerId = document.getElementById("borrowerNameInput").value;
    const response = await fetch(`${API_URL}/borrower/${borrowerId}/history`);
    const history = await response.json();

    const historyList = document.getElementById("borrowerHistoryList");
    historyList.innerHTML = "<h2>Borrowing History</h2>";
    history.forEach(entry => {
        historyList.innerHTML += `
            <li>Book "${entry.id}" borrowed on ${entry.borrowed_at}, 
            returned on ${entry.returned_at || "Not yet returned"}</li>`;
    });
}

async function populateBookDropdowns() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) throw new Error("Failed to fetch books");
        
        const books = await response.json();
        
        const borrowSelect = document.getElementById("borrowBookSelect");
        const returnSelect = document.getElementById("returnBookSelect");
        const historySelect = document.getElementById("historyBookSelect");

        // Clear existing options
        borrowSelect.innerHTML = `<option value="">Select a book</option>`;
        returnSelect.innerHTML = `<option value="">Select a book</option>`;
        historySelect.innerHTML = `<option value="">Select a book</option>`;

        if (books.length === 0) {
            console.warn("No books available.");
            return;
        }

        books.forEach(book => {
            let option = `<option value="${book.id}">${book.title} by ${book.author}</option>`;

            if (book.status == "available") {
                borrowSelect.innerHTML += option;
            } else {
                returnSelect.innerHTML += option;
            }

            historySelect.innerHTML += option;
        });

        console.log("Dropdowns updated successfully!");
    } catch (error) {
        console.error("Error populating dropdowns:", error);
    }
}

async function loadBooks(){
    // Ensure dropdowns are populated after books are loaded
    await fetchBooks();
    await populateBookDropdowns();
    showSection('allBooks');
}

document.addEventListener("DOMContentLoaded", async () => {
    loadBooks()
});