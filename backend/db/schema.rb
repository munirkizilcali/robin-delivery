# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_17_170102) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "meals", force: :cascade do |t|
    t.bigint "order_id"
    t.bigint "menu_item_id"
    t.decimal "price"
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_meals_on_menu_item_id"
    t.index ["order_id"], name: "index_meals_on_order_id"
  end

  create_table "menu_items", force: :cascade do |t|
    t.bigint "restaurant_id"
    t.string "name"
    t.integer "calories"
    t.string "ingredients"
    t.decimal "price"
    t.boolean "vegetarian"
    t.boolean "vegan"
    t.string "description"
    t.string "photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "item_type"
    t.index ["restaurant_id"], name: "index_menu_items_on_restaurant_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "restaurant_id"
    t.bigint "user_id"
    t.integer "courier_id"
    t.string "order_location"
    t.string "order_address"
    t.datetime "order_time"
    t.datetime "pickup_time"
    t.datetime "delivery_time"
    t.integer "estimated_duration"
    t.string "status"
    t.datetime "driver_assigned_time"
    t.decimal "tip_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_orders_on_restaurant_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "motto"
    t.string "logo"
    t.string "address"
    t.string "cuisine"
    t.string "location"
    t.boolean "available"
    t.integer "manager_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "order_id"
    t.integer "restaurant_rating"
    t.integer "delivery_rating"
    t.string "restaurant_review"
    t.string "delivery_review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_reviews_on_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "user_type"
    t.string "photo_url"
    t.string "mount"
    t.boolean "available"
    t.string "location"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "meals", "menu_items"
  add_foreign_key "meals", "orders"
  add_foreign_key "menu_items", "restaurants"
  add_foreign_key "orders", "restaurants"
  add_foreign_key "orders", "users"
  add_foreign_key "reviews", "orders"
end
