const locationReducer = (
	state = {
		coords: {
			latitude: 0,
			longitude: 0,
			accuracy: 0
		},
		range: 1
	},
	action
) => {
	switch (action.type) {
		case "SET_LOCATION":
			return { ...state, ...action.payload };
		case "SET_RANGE":
			return { ...state, range: action.range };
		default:
			return state;
	}
};

export default locationReducer;
