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

end