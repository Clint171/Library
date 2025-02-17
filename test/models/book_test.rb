require "test_helper"

class BookTest < ActiveSupport::TestCase
  test "should not save book without title and author" do
    book = Book.new
    assert_not book.save, "Saved the book without a title and author"
  end

  test "should have valid status" do
    book = Book.new(title: "Valid Book", author: "Author", status: "invalid")
    assert_not book.valid?, "Book should have a valid status"
  end
end
