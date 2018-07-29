class Order < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user
  belongs_to :courier, class_name: 'User', required: false
  has_many :meals
  has_many :menu_items, through: :meals
  has_one :review

  def price
  	sum = 0
  	self.meals.each do |meal| 
  		sum = sum + (meal.number * meal.price)
  	end
  	sum
  end
end
