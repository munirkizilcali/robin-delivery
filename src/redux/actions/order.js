import { myFetch } from "../../lib/myFetch";
import moment from "moment";
import { resetCart } from "./cart";
import { fetchRecentOrders } from "./recentOrders";

export const submitOrder = (user, cart, restaurant) => {
	let order = {
		restaurant_id: restaurant.id,
		user_id: user.id,
		order_location: user.location,
		order_address: user.address,
		order_time: moment().format(),
		status: "new"
	};

	let meals = [];
	cart.forEach(item => {
		meals.push({
			order_id: "",
			menu_item_id: item.id,
			price: item.price,
			number: item.count
		});
	});
	// debugger;
	return dispatch => {
		return myFetch("/orders", {
			method: "POST",
			body: JSON.stringify(order)
		})
			.then(res => {
				// debugger;
				return res.json();
			})
			.then(json => {
				meals.map(meal => (meal.order_id = json.id));
				meals.forEach(meal => {
					myFetch("/meals", {
						method: "POST",
						body: JSON.stringify(meal)
					}).then(res => {
						console.log(res);
						return res.json();
					});
				});
				return Promise.resolve(true);
			})
			.then(() => dispatch(resetCart()))

			.catch(err => {
				// debugger;
				return Promise.reject(false);
			});
	};
};

export const submitTip = (orderId, tipAmount) => {
	let order = {
		tip_amount: tipAmount
	};
	return dispatch => {
		return myFetch(`/orders/${orderId}`, {
			method: "PATCH",
			body: JSON.stringify(order)
		})
			.then(res => {
				// debugger;
				return res.json();
			})
			.then(json => {
				return Promise.resolve(true);
			})
			.then(() => dispatch(fetchRecentOrders()))
			.catch(err => {
				// debugger;
				return Promise.reject(false);
			});
	};
};
