class User < ApplicationRecord
	has_secure_password
	has_many :orders
	has_many :reviews, through: :orders
	has_many :deliveries, class_name: 'Order', foreign_key: 'courier_id'

	def total_tips
		total_tip = 0
		if self.user_type == 'courier'
			self.deliveries.each do |del|
				if del.tip_amount 
					total_tip = total_tip + del.tip_amount
				end
			end
		end
		total_tip
	end
end
