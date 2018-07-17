class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :motto
      t.string :logo
      t.string :address
      t.string :cuisine
      t.string :location
      t.boolean :available
      t.integer :manager_id

      t.timestamps
    end
  end
end
