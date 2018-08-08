### Summary
Robin Delivery is a food delivery app where customers can see restaurants nearby, filter and sort them, select one and prepare a cart out of the menu items. Orders are sent to a nearby driver for confirmation. Confirmed driver receives the details of the order with a navigation map generated. Completed orders can be rated and tipped by customer.

Two different user interfaces exists for customers and drivers.

This project is created as a final project in two and a half weeks time for Flatiron Bootcamp. 
### Demo Video
[![Robin Delivery Portfolio App - Demo Video](https://img.youtube.com/vi/B0k1m7zLxnc/0.jpg)](https://www.youtube.com/watch?v=B0k1m7zLxnc)
### Demo Links
Please use incognito windows or different browsers if you want to access both (customer and driver interfaces) at the same time. 

As backend is deployed on Heroku Free Tier, please consider wakeup time needed and refresh the page if login doesn't work at your first attempt.

[Customer Interface Link](https://munirkizilcali.com/robin-delivery/) 

Username: munir@test.com  
Password: komanchero5555

[Driver Interface Link](https://munirkizilcali.com/robin-delivery/driver)

Username: mike@test.com  
Password: fasterThanLight123
### Technologies
- Single Page application using React at the front end, Ruby on Rails at back end
- Rails handles all API calls, models, database and user authentication with JWT.
- Redux and Redux Thunk for frontend state and data handling.
- Active Storage for map and image processing.
- Semantic UI for responsive frontend design and loading animations.
- React Router for url handling.
- Lodash library for debounce and frontend sort.
- HTML 5 Geolocation
- Used third party APIs and services:
	- Google Places API for restaurant data
	- Google Geolocation API for distance and coordinates - address conversions
	- Google Routes API for fetching route data
	- Google Static Maps API for creating navigation maps
	- AWS S3 for image and map storage
	- Heroku Free tier for backend deployment
	- Github pages for frontend deployment
	
### Database Schema
	
| users | restaurants | menu_items | orders | meals | reviews |
|-------|-------------|------------|--------|-------|---------|
| first_name | name | restaurant_id | restaurant_id | order_id | order_id |
| last_name | motto | name | user_id | menu_item_id | restaurant_rating |
| email | logo | calories | courier_id | price | restaurant_review |
| location | address | ingredients | order_location | number |  delivery_rating |
| address | cuisine | price | order_address | | delivery_review |
| password_digest | location | type | order_time | |  |
| type: 1. customer, 2. courier, 3. restaurant_manager, 4. admin | available:boolean | vegeratian | pickup_time | | |
| photo_url | manager_id | vegan | delivery_time | |  |
| mount: 1. Walking, 2. Bike, 3. Car | google_id | description | estimated_duration | | |
| available:boolean | google_rating | photo_url | status | | |
| | price_level | | driver_assigned_time | | |
| | photo: activeStorage | | tip_amount | | |
| | | | map: activeStorage | | |

