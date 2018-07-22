const locationReducer = (
	state = {
		coords: {
			latitude: 0,
			longitude: 0,
			accuracy: 0
		}
	},
	action
) => {
	switch (action.type) {
		case "SET_LOCATION":
			return action.payload;
		default:
			return state;
	}
};

export default locationReducer;
