class AddPriceLevelToRestaurants < ActiveRecord::Migration[5.2]
  def change
  	add_column :restaurants, :price_level, :integer
  end
end
