import { myFetch } from "../../lib/myFetch";
import { setDistancesForSearchResults } from "./location";

export const addResults = results => {
	return { type: "ADD_RESULTS", results };
};

export const setSearchTerm = searchTerm => {
	return { type: "SET_SEARCH_TERM", searchTerm };
};

export const setNextToken = nextToken => {
	return { type: "SET_NEXT_TOKEN", nextToken };
};

export const addMoreResults = results => {
	return { type: "ADD_MORE_RESULTS", results };
};

export const nearbyRestaurants = (
	location,
	radius,
	searchTerm = "",
	nextToken = ""
) => {
	return dispatch => {
		// debugger;
		return myFetch(
			`/google_places/${location.coords.latitude}/${
				location.coords.longitude
			}/${parseInt(radius * 1609, 10)}/${
				searchTerm !== "" ? encodeURI(searchTerm) : "nO0n"
			}/${nextToken ? nextToken : "nO0n"}`
		)
			.then(resp => resp.json())
			.then(json => {
				if (json.next_page_token) {
					dispatch(setNextToken(json.next_page_token));
				} else {
					dispatch(setNextToken(""));
				}
				return dispatch(
					setDistancesForSearchResults(
						{
							lat: location.coords.latitude,
							lng: location.coords.longitude
						},
						"driving",
						json.results
					)
				);
			})
			.then(json => {
				if (nextToken !== "") {
					return dispatch(addMoreResults(json));
				} else {
					return dispatch(addResults(json));
				}
			})
			.catch(err => Promise.reject(err));
	};
};
