class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.references :restaurant, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :courier_id
      t.string :order_location
      t.string :order_address
      t.datetime :order_time
      t.datetime :pickup_time
      t.datetime :delivery_time
      t.integer :estimated_duration
      t.string :status
      t.datetime :driver_assigned_time
      t.decimal :tip_amount

      t.timestamps
    end
  end
end
