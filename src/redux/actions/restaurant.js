import { myFetch } from "../../lib/myFetch";

export const saveRestaurantInfo = restaurant => {
	return { type: "SAVE_RESTAURANT_INFO", restaurant: restaurant };
};

export const fetchRestaurantData = id => {
	// debugger;
	return dispatch => {
		myFetch(`/google_places/by_id/${id}`)
			.then(res => res.json())
			.then(json => {
				dispatch(saveRestaurantInfo(json));
				return Promise.resolve(true);
			})
			.catch(err => Promise.reject(false));
	};
};

export const resetRestaurantInfo = () => {
	return { type: "RESET_RESTAURANT_INFO" };
};
