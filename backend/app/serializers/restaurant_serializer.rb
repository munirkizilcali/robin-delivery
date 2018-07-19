class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :motto, :logo, :address, :cuisine, :location, :available, :manager_id, :rating, :number_of_orders
end
