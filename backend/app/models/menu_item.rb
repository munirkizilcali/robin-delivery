class MenuItem < ApplicationRecord
  belongs_to :restaurant
  has_many :meals
  has_many :orders, through: :meals
end
