class MealSerializer < ActiveModel::Serializer
  attributes :id, :price, :number
  has_one :order
  has_one :menu_item
end
