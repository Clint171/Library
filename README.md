# 📚 Book Lending Library API & Web Interface

This is a **Ruby on Rails 8** application that provides a **book lending library API** with a front-end UI served at `/`. Users can **add, borrow, return, and view books** along with their lending history.

---

## 🚀 Getting Started

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Ruby** (version 3.x recommended) - Check with:
  ```sh
  ruby -v
  ```
- **Rails 8** - Install or check version:
  ```sh
  gem install rails
  rails -v
  ```
- **Bundler** (to manage dependencies):
  ```sh
  gem install bundler
  ```
- **SQLite3** (or PostgreSQL if configured)

---

### **2️⃣ Setup the Project**

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Clint171/Library.git
   cd Library
   ```
2. **Install dependencies:**
   ```sh
   bundle install
   ```
3. **Set up the database:**
   ```sh
   rails db:migrate
   ```
4. **(Optional) Seed sample data:**
   ```sh
   rails db:seed
   ```

---

### **3️⃣ Running the Server**
Start the Rails server:
```sh
rails s
```
The site will be accessible at:
👉 **http://localhost:3000/** (Web Interface)
👉 **http://localhost:3000/books** (API Endpoint)

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/books` | List all books |
| `GET` | `/books/:id` | Get a single book |
| `POST` | `/books` | Add a new book |
| `PATCH` | `/books/:id` | Update a book |
| `DELETE` | `/books/:id` | Delete a book |
| `POST` | `/books/:book_id/borrow` | Borrow a book |
| `POST` | `/books/:book_id/return` | Return a book |
| `GET` | `/borrower/:borrower/history` | Get borrow history by borrower |

---

## 🧪 Running Tests

Run **all tests**:
```sh
rails test
```
Run **only model tests**:
```sh
rails test test/models
```
Run **only controller tests**:
```sh
rails test test/controllers
```
Run a **specific test file**:
```sh
rails test test/controllers/lendings_controller_test.rb
```

---
