import { myFetch } from "../../lib/myFetch";
import { history } from "../history";

export const saveRestaurantInfo = restaurant => {
	return { type: "SAVE_RESTAURANT_INFO", restaurant: restaurant };
};

export const fetchRestaurantData = id => {
	// debugger;
	return dispatch => {
		return myFetch(`/google_places/by_id/${id}`)
			.then(res => res.json())
			.then(json => {
				dispatch(saveRestaurantInfo(json));
				return Promise.resolve(true);
			})
			.catch(err => Promise.reject(false));
	};
};

export const restaurantView = id => {
	return dispatch => {
		dispatch(fetchRestaurantData(id)).then(() => {
			history.push(`/restaurants/${id}`);
		});
	};
};

export const resetRestaurantInfo = () => {
	return { type: "RESET_RESTAURANT_INFO" };
};
