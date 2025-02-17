class LendingsController < ApplicationController
    before_action :set_book, only: [:borrow, :return_book]
  
    # Borrow a book
    def borrow
      if @book.status == 'borrowed'
        return render json: { error: 'Book is already borrowed' }, status: :unprocessable_entity
      end
  
      lending = @book.lendings.create(borrower: params[:borrower], borrowed_at: Time.current)
      @book.update(status: 'borrowed')
  
      render json: lending, status: :created
    end
  
    # Return a book
    def return_book
      lending = @book.lendings.where(returned_at: nil).last
  
      if lending.nil?
        return render json: { error: 'This book is not currently borrowed' }, status: :unprocessable_entity
      end
  
      lending.update(returned_at: Time.current)
      @book.update(status: 'available')
  
      render json: lending
    end
  
    # Get borrowing history of a specific borrower
    def borrower_history
      lendings = Lending.where(borrower: params[:borrower])
      render json: lendings
    end
  
    private
  
    def set_book
      @book = Book.find(params[:book_id])
    end
end
  