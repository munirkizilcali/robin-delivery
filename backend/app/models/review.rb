class Review < ApplicationRecord
  belongs_to :order
  belongs_to :user through: :order
  belongs_to :restaurant through: :order
end
