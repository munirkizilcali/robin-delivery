class Order < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user
  has_many :meals
  has_many :menu_items, through: :meals
  has_one :review
end
