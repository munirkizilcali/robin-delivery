require 'rest-client'
require 'json'
require 'open-uri'
require "image_processing/mini_magick"

class GooglePlace < ApplicationRecord

	def self.nearby_restaurants(lat, lng, radius)
		res = RestClient.get 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?', params: {key: GOOGLE_API_KEY, type: 'restaurant', location: "#{lat},#{lng}", radius: radius}
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