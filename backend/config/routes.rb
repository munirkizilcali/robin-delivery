Rails.application.routes.draw do  
	namespace :api do
		namespace :v1 do
		  resources :orders
		  resources :reviews
		  resources :meals
		  resources :menu_items
		  resources :restaurants
		  resources :users, only: [:index]
		  get '/users/check' => 'users#check'
		  post 'user_token' => 'user_token#create'
		  get '/google_places/:lat/:lng/:radius', to: 'google_places#index', :constraints => {:lat => /\-?\d+(.\d+)?/, :lng => /\-?\d+(.\d+)?/}
		  get '/google_places/by_id/:google_id' => 'google_places#create_or_find_by_restaurant'
		end
	end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
