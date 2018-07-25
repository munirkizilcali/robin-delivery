import { myFetch } from "../../lib/myFetch";

const setRecentOrders = recentOrders => {
	return {
		type: "SET_RECENT_ORDERS",
		recentOrders: recentOrders
	};
};

export const fetchRecentOrders = () => {
	return dispatch => {
		return myFetch("/orders")
			.then(res => {
				return res.json();
			})
			.then(json => {
				dispatch(setRecentOrders(json));
			})
			.then(() => Promise.resolve(true))

			.catch(err => {
				// debugger;
				return Promise.reject(false);
			});
	};
};
