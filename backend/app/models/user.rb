class User < ApplicationRecord
	has_secure_password
	has_many :orders
	has_many :reviews, through: :orders
	has_many :deliveries, class_name: 'Order', foreign_key: 'courier_id'
end
