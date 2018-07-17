class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.references :order, foreign_key: true
      t.references :menu_item, foreign_key: true
      t.decimal :price
      t.integer :number

      t.timestamps
    end
  end
end
