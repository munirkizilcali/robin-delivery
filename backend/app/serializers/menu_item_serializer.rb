class MenuItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :calories, :ingredients, :price, :item_type, :vegetarian, :vegan, :description, :photo_url, :restaurant_id
  has_one :restaurant
end
