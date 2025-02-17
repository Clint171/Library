require "test_helper"

class LendingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one) # Assuming you have a fixture for books
  end

  test "should borrow a book" do
    post "/books/#{@book.id}/borrow", params: { borrower: "John Doe" }
    assert_response :created
  end
end
