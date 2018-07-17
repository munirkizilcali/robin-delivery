class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :user_type
      t.string :photo_url
      t.string :mount
      t.boolean :available
      t.string :location
      t.string :address

      t.timestamps
    end
  end
end
