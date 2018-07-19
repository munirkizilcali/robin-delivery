const restaurantReducer = (state = {}, action) => {
	switch (action.type) {
		case "SAVE_RESTAURANT_INFO":
			return { ...action.restaurant };
		default:
			return state;
	}
};

export default restaurantReducer;
