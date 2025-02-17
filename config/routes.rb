Rails.application.routes.draw do
  resources :books, only: [:index, :show, :create, :update, :destroy] do
    get 'history', on: :member
  end
  
  post '/books/:book_id/borrow', to: 'lendings#borrow'
  post '/books/:book_id/return', to: 'lendings#return_book'
  get '/borrower/:borrower/history', to: 'lendings#borrower_history'
end
