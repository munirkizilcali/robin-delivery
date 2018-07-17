class Change < ActiveRecord::Migration[5.2]
  def change
  	remove_column :menu_items, :type 
  	add_column :menu_items, :item_type, :string
  end
end
