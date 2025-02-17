class Lending < ApplicationRecord
  belongs_to :book

  validates :borrower, presence: true
  validates :borrowed_at, presence: true
end
