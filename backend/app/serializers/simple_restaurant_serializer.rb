class SimpleRestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name,  :logo, :address, :cuisine, :location, :rating, :number_of_orders

end