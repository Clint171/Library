class BooksController < ApplicationController
    before_action :set_book, only: [:show, :update, :destroy]
  
    # List all books
    def index
      books = Book.all
      render json: books
    end
  
    # Show details of a single book (including lending history)
    def show
      render json: @book.as_json(include: :lendings)
    end
  
    # Create a new book
    def create
      book = Book.new(book_params)
      book.status = 'available'
  
      if book.save
        render json: book, status: :created
      else
        render json: book.errors, status: :unprocessable_entity
      end
    end
  
    # Update a book
    def update
      if @book.update(book_params)
        render json: @book
      else
        render json: @book.errors, status: :unprocessable_entity
      end
    end
  
    # Delete a book
    def destroy
      @book.destroy
      head :no_content
    end
  
    private
  
    def set_book
      @book = Book.find(params[:id])
    end
  
    def book_params
      params.require(:book).permit(:title, :author)
    end
end
  