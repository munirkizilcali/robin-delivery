const locationReducer = (
	state = {
		coords: {
			latitude: 0,
			longitude: 0,
			accuracy: 0
		},
		range: 1,
		address: ""
	},
	action
) => {
	switch (action.type) {
		case "SET_LOCATION":
			return { ...state, ...action.payload };
		case "SET_RANGE":
			return { ...state, range: action.range };
		case "SET_ADDRESS":
			return { ...state, address: action.address };
		default:
			return state;
	}
};

export default locationReducer;
