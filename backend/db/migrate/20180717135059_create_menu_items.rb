class CreateMenuItems < ActiveRecord::Migration[5.2]
  def change
    create_table :menu_items do |t|
      t.references :restaurant, foreign_key: true
      t.string :name
      t.integer :calories
      t.string :ingredients
      t.decimal :price
      t.string :type
      t.boolean :vegetarian
      t.boolean :vegan
      t.string :description
      t.string :photo_url

      t.timestamps
    end
  end
end
