class OrderSerializer < ActiveModel::Serializer
  attributes :id, :courier_id, :order_location, :order_address, :order_time, :pickup_time, :delivery_time, :estimated_duration, :status, :driver_assigned_time, :tip_amount
  has_one :restaurant
  has_one :user
end
