Rails.application.routes.draw do  
	namespace :api do
		namespace :v1 do
		  resources :orders
		  resources :reviews
		  resources :meals
		  resources :menu_items
		  resources :restaurants
		  resources :users, only: [:index]
		  post 'user_token' => 'user_token#create'
		end
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
