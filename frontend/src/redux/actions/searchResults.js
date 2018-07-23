import { myFetch } from "../../lib/myFetch";

export const addResults = results => {
	return { type: "ADD_RESULTS", results };
};

export const nearbyRestaurants = (location, radius) => {
	return dispatch => {
		return myFetch(
			`/google_places/${location.coords.latitude}/${
				location.coords.longitude
			}/${radius}`
		)
			.then(resp => resp.json())
			.then(json => {
				return dispatch(addResults(json.results));
			})
			.catch(err => Promise.reject(err));
	};
};
