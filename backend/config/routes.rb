Rails.application.routes.draw do
  resources :orders
  resources :reviews
  resources :meals
  resources :menu_items
  resources :restaurants
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
