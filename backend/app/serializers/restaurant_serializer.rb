class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :motto, :logo, :address, :cuisine, :location, :available, :manager_id, :rating, :number_of_orders
  has_many :menu_items

	class MenuItemSerializer < ActiveModel::Serializer
	  attributes :id, :name, :price, :item_type, :vegetarian, :vegan
	end

end


