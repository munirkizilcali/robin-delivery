import { myFetch } from "../../lib/myFetch";

const getPosition = function(options) {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};

const setLocation = position => {
	return {
		type: "SET_LOCATION",
		payload: {
			coords: {
				latitude: position.latitude,
				longitude: position.longitude,
				accuracy: position.accuracy
			}
		}
	};
};

const setAddress = address => {
	return {
		type: "SET_ADDRESS",
		address: address
	};
};

export const setRange = range => {
	return {
		type: "SET_RANGE",
		range: range
	};
};

export const fetchDistances = (origin, destinations, method = "driving") => {
	let destinationString = "";
	destinations.forEach(
		(destination, index) =>
			index !== destinations.length - 1
				? (destinationString += `place_id:${destination}|`)
				: (destinationString += `place_id:${destination}`)
	);
	return dispatch => {
		return myFetch(
			`/google_places/find_distance_and_duration/${encodeURI(
				origin.lat
			)}/${encodeURI(origin.lng)}/${destinationString}/${method}`
		)
			.then(resp => resp.json())
			.catch(err => Promise.reject(err));
	};
};

export const setDistancesForSearchResults = (origin, method, searchResults) => {
	let destinations = [];
	destinations = searchResults.map(restaurant => restaurant.place_id);
	return dispatch => {
		return dispatch(fetchDistances(origin, destinations, method)).then(
			json => {
				dispatch(setAddress(json.origin_addresses[0]));
				return searchResults.map((restaurant, index) => {
					restaurant["distance"] = json.rows[0].elements[index];
					restaurant["distance"]["address"] =
						json.destination_addresses[index];
					return restaurant;
				});
			}
		);
	};
};

export const setPosition = () => {
	return dispatch =>
		getPosition()
			.then(geolocation => {
				return dispatch(setLocation(geolocation.coords));
			})
			.catch(err => console.log(err));

	// 	  // }, 1000);
	//   const request = {
	//     auth: { email: email, password: password }
	//   };
	//   return myFetch("/user_token", {
	//     body: JSON.stringify(request)
	//   })
	//     .then(res => {
	//       console.log(res);
	//       return res.json();
	//     })
	//     .then(res => {
	//       console.log(res);
	//       localStorage.setItem("token", res.jwt);
	//       return callback(null);
	//     })
	//     .catch(err => callback(err));
	// }
};
