const restaurantReducer = (state = {}, action) => {
	switch (action.type) {
		case "SAVE_RESTAURANT_INFO":
			return { ...action.restaurant };
		case "RESET_RESTAURANT":
			return {};
		default:
			return state;
	}
};

export default restaurantReducer;
