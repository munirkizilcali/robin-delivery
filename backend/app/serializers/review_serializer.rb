class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_rating, :delivery_rating, :restaurant_review, :delivery_review
  has_one :order
end
