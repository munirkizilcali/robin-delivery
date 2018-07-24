class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :motto, :logo, :address, :cuisine, :location, :available, :manager_id, :rating, :number_of_orders, :photo_url, :google_rating
  has_many :menu_items

	class MenuItemSerializer < ActiveModel::Serializer
	  attributes :id, :name, :price, :item_type, :vegetarian, :vegan
	end



end


