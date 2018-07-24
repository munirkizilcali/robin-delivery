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

export const setRange = range => {
	return {
		type: "SET_RANGE",
		range: range
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
