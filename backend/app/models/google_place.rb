require 'rest-client'
require 'json'
require 'open-uri'
require "image_processing/mini_magick"

class GooglePlace < ApplicationRecord

	def self.nearby_restaurants(lat, lng, radius, search_term, next_token)
		if next_token == 'nO0n'
			res = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=#{GOOGLE_API_KEY}&type=restaurant&location=#{lat},#{lng}&radius=#{radius}#{search_term == 'nO0n' ? '' : '&keyword='+search_term}"
		else 
			res = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=#{next_token}&key=#{GOOGLE_API_KEY}"
		end
			# "https://api.yelp.com/v3/businesses/search?latitude=#{lat}&longitude=#{lng}&categories=restaurants&radius=#{radius}&sort_by=distance&limit=50&term=#{search_term == 'nO0n' ? '' : search_term}", headers: {:Authorization => 'Bearer K9diKEJeeOCKJ02CJNJvr2QHzUl48-BJyGg7q8MfuBwvyWEIowm0VPOETH2DmtCTaGQBl5Ubpq9dBEg_JQhusNKDIfKbuZsUw2pkQ4sEm5HJoS5oTVkN7Oqgb6ZYW3Yx'}
			# debugger
			# "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=#{GOOGLE_API_KEY}&type=restaurant&location=#{lat},#{lng}&radius=#{radius}#{search_term == 'nO0n' ? '' : search_term}"
		JSON.parse(res.body)
	end

	def self.fetch_restaurant_details(google_id)
		res = RestClient.get 'https://maps.googleapis.com/maps/api/place/details/json?', params: {key: GOOGLE_API_KEY, placeid: google_id}
		JSON.parse(res.body)
	end

	def self.grab_image(photo_reference)
    	downloaded_image = open("https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=#{photo_reference}&key=#{GOOGLE_API_KEY}")

	end

	def self.fetch_distances(lat, lng, destination_string, method)
		res = RestClient.get "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=#{lat}%2C#{lng}&destinations=#{destination_string}&mode=#{method}&key=#{GOOGLE_API_KEY}"
	end

	def self.fetch_navigation(origin_lat, origin_lng, destination_lat, destination_lng)
		res = RestClient.get "https://maps.googleapis.com/maps/api/directions/json?key=#{GOOGLE_API_KEY}&origin=#{origin_lat}%2C#{origin_lng}&destination=#{destination_lat}%2C#{destination_lng}"
	end

	def self.fetch_map_picture(driver_lat, driver_lng, restaurant_lat, restaurant_lng, customer_lat, customer_lng, first_path_polyline, second_path_polyline)
		map = open("https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBNo69f7JE-4Q0h_H8lNGKHFm0Sg0PMQZY&size=1000x1000&markers=label:Y|#{driver_lat}%2C#{driver_lng}&markers=label:R|color:yellow|#{restaurant_lat}%2C#{restaurant_lng}&markers=label:C|color:green|#{customer_lat}%2C#{customer_lng}&path=color:red|enc:#{first_path_polyline}&path=enc:#{second_path_polyline}")
	end

end