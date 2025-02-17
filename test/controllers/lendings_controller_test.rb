require "test_helper"

class LendingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @book = books(:one) # Assuming you have a fixture
  end

  test "should borrow a book" do
    post borrow_book_url(@book), params: { borrower: "John Doe" }
    assert_response :created
  end
end
