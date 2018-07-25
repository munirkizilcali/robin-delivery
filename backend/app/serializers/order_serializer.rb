class OrderSerializer < ActiveModel::Serializer
  attributes :id, :courier_id, :order_location, :order_address, :order_time, :pickup_time, :delivery_time, :estimated_duration, :status, :driver_assigned_time, :tip_amount, :price
  has_one :restaurant
	class RestaurantSerializer < ActiveModel::Serializer
		attributes :id, :name
	end
  has_one :user
  has_one :review
	class ReviewSerializer < ActiveModel::Serializer
		attributes :id, :restaurant_rating, :delivery_rating, :restaurant_review, :delivery_review
	end

end
