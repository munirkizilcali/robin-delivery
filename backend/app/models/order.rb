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

  def ask_courier(courier)
    self.update(status: 'new', courier: courier)
    self.save
    self
  end

  def assign_courier
    self.update(status: 'courierSet', driver_assigned_time: Time.now)
    self.save
    self
  end

  def pick_up
    self.update(status: 'pickedUp', pickup_time: Time.now)
    self.save
    self
  end

  def complete
    self.update(status: 'completed', delivery_time: Time.now)
    self.save
    self
  end

end
