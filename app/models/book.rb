class Book < ApplicationRecord
    has_many :lendings, dependent: :destroy
  
    validates :title, :author, presence: true
    validates :status, inclusion: { in: ['available', 'borrowed'] }
end