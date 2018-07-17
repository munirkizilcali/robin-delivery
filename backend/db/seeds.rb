# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

cuisine=['American', 'Barbecue', 'Chinese', 'French', 'Hamburger', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Thai']

food_type=['Main', 'Beverage', 'Dessert', 'Starter', 'Pasta', 'Sandwich', 'Grill' ]

user1 = User.create({first_name:'user1', email:'user1@test.com', password:'12345678', password_confirmation:'12345678', user_type:'customer', photo_url: "https://robohash.org/user1?set=set2"})
user2 = User.create({first_name:'user2', email:'user2@test.com', password:'12345678', password_confirmation:'12345678', user_type:'customer', photo_url: "https://robohash.org/user2?set=set2"})
user3 = User.create({first_name:'user3', email:'user3@test.com', password:'12345678', password_confirmation:'12345678', user_type:'customer', photo_url: "https://robohash.org/user3?set=set2"})
courier1 = User.create({first_name:'courier1', email:'courier1@test.com', password:'12345678', password_confirmation:'12345678', user_type:'courier', photo_url: "https://robohash.org/courier1?set=set2"})
courier2 = User.create({first_name:'courier2', email:'courier2@test.com', password:'12345678', password_confirmation:'12345678', user_type:'courier', photo_url: "https://robohash.org/courier2?set=set2"})
manager1 = User.create({first_name:'manager1', email:'manager1@test.com', password:'12345678', password_confirmation:'12345678', user_type:'manager', photo_url: "https://robohash.org/manager1?set=set2"})
manager2 = User.create({first_name:'manager2', email:'manager2@test.com', password:'12345678', password_confirmation:'12345678', user_type:'manager', photo_url: "https://robohash.org/manager2?set=set2"})
admin1 = User.create({first_name:'admin1', email:'admin1@test.com', password:'12345678', password_confirmation:'12345678', user_type:'admin', photo_url: "https://robohash.org/admin1?set=set2"})

managers = [manager1, manager2]
users = [user1, user2, user3]
couriers = [ courier1, courier2]

10.times do 
	rest = Restaurant.create({ name: Faker::HitchhikersGuideToTheGalaxy.planet, motto: Faker::HitchhikersGuideToTheGalaxy.quote, address: Faker::Address.full_address, cuisine: cuisine[rand(cuisine.length)], location: "#{Faker::Address.latitude},#{Faker::Address.longitude}", available:true, manager_id: managers[rand(managers.length)].id, logo:'https://picsum.photos/200/?random' })
	(rand(20)+5).times do 
		rest.menu_items.create({name: Faker::Food.dish, calories: rand(900), ingredients: "#{Faker::Food.ingredient}, #{Faker::Food.ingredient}, #{Faker::Food.ingredient}, #{Faker::Food.ingredient} and #{Faker::Food.ingredient}", price: rand(5), item_type: food_type[rand(food_type.length)], vegetarian:[true, false].sample, vegan:[true, false].sample, description: Faker::Food.description, photo_url:'https://picsum.photos/200/?random'})
	end
end

users.each do |user| 
	5.times do 
		dcl = rand(10)
		rest = Restaurant.all[rand(Restaurant.all.length)]
		ordr = user.orders.create({restaurant_id: rest.id, courier_id: couriers[rand(couriers.length)], order_address: user.address, order_location: user.location, order_time: Time.now - dcl.hours, pickup_time: Time.now - dcl.hours + 10.minutes, delivery_time: Time.now - dcl.hours + 20.minutes, status: 'delivered'})	
		(rand(6)+1).times do 
			item = rest.menu_items.all[rand(rest.menu_items.all.length)]
			ordr.meals.create({menu_item_id:item.id, price: item.price, number: rand(3)})
		end
		rvw = Review.create({restaurant_rating: rand(10), delivery_rating: rand(10)})
		ordr.review = rvw
		ordr.save
	end
end 


