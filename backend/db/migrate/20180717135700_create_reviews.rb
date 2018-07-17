class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.references :order, foreign_key: true
      t.integer :restaurant_rating
      t.integer :delivery_rating
      t.string :restaurant_review
      t.string :delivery_review

      t.timestamps
    end
  end
end
