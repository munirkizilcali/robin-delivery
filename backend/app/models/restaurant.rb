class Restaurant < ApplicationRecord
	has_many :menu_items
	has_many :orders
	has_many :reviews, through: :orders
	has_many :users, through: :orders

	has_one_attached :photo

	def rating
		total_rating = 0

		self.reviews.each do |review| 
			total_rating = total_rating + review.restaurant_rating
		end
		if self.orders.length != 0
			rating = total_rating / self.orders.length
		else
			rating = 0
		end
		rating
	end

	def number_of_orders
		self.orders.length
	end

	def photo_url
		# begin
		# 	Rails.application.routes.url_for(controller: 'active_storage/blobs', action: :show, signed_id: self.photo.signed_id, filename: self.photo.filename, host: Rails.application.routes.default_url_options[:host])
		# rescue
		# 	'NonPhoto'
		# end

		self.photo.service_url

	end

end
