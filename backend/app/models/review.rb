class Review < ApplicationRecord
  belongs_to :order
  has_one :user, through: :order
  has_one :restaurant, through: :order
end
