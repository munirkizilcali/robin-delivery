class Api::V1::GooglePlacesController < ApplicationController

  def index
    output = GooglePlace.nearby_restaurants(params[:lat], params[:lng], params[:radius])
    render json: output
  end

  def create_or_find_by_restaurant(google_id)
  	place_details = GooglePlace.fetch_restaurant_details(google_id)
  	if place_details['status'] != 'OK'
  		render json: place_details
  	else
	  	restaurant = Restaurant.find_or_create_by(google_id: google_id)

	  	if !restaurant.name
	  		restaurant.name = place_details['result']['name']
	  		restaurant.location = "#{place_details['result']['geometry']['lat']},#{place_details['result']['geometry']['lng']}"
	  		restaurant.address = place_details['result']['formatted_address']
	  	end
	end
  	debugger
  	puts 'stop'

  end

end