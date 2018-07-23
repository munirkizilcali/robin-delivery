class AddColumnToRestaurants < ActiveRecord::Migration[5.2]
  def change
  	add_column :restaurants, :google_id, :string
  end
end
