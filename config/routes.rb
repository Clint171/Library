Rails.application.routes.draw do
  resources :books, only: [:index, :show, :create, :update, :destroy]

  post '/books/:book_id/borrow', to: 'lendings#borrow'
  post '/books/:book_id/return', to: 'lendings#return_book'
  get '/borrower/:borrower/history', to: 'lendings#borrower_history'
end
