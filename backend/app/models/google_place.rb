require 'rest-client'
require 'json'


class GooglePlace < ApplicationRecord

	def self.nearby_restaurants(location, radius)
		res = RestClient.get 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?', params: {key: GOOGLE_API_KEY, type: 'restaurant', location: location, radius: radius}
		JSON.parse(res.body)
	end

end