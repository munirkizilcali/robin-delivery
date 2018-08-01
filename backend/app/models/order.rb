class Order < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user
  belongs_to :courier, class_name: 'User', required: false
  has_many :meals
  has_many :menu_items, through: :meals
  has_one :review

  has_one_attached :map_picture

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
    first_path = GooglePlace.fetch_navigation(self.order_location.split(',')[0].to_f+0.01, self.order_location.split(',')[1].to_f-0.01, self.restaurant.location.split(',')[0], self.restaurant.location.split(',')[1])
    second_path = GooglePlace.fetch_navigation(self.restaurant.location.split(',')[0], self.restaurant.location.split(',')[1], self.order_location.split(',')[0], self.order_location.split(',')[1])
    # debugger
    if self.order_location != '0,0'
      map = GooglePlace.fetch_map_picture(self.order_location.split(',')[0].to_f+0.01, self.order_location.split(',')[1].to_f-0.01, self.restaurant.location.split(',')[0], self.restaurant.location.split(',')[1], self.order_location.split(',')[0], self.order_location.split(',')[1], JSON(first_path)['routes'].first['overview_polyline']['points'], JSON(second_path)['routes'].first['overview_polyline']['points'])
      self.map_picture.attach(io: map, filename:"#{self.id}map.png")
    end
    # debugger
    self.update(status: 'courierSet', driver_assigned_time: Time.now)
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

  def map_url
    begin
      Rails.application.routes.url_for(controller: 'active_storage/blobs', action: :show, signed_id: self.map_picture.signed_id, filename: self.map_picture.filename, host: Rails.application.routes.default_url_options[:host])
    rescue
      'No_map'
    end

  end

end
