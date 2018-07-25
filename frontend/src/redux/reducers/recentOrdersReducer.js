const recentOrdersReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_RECENT_ORDERS":
			return [...state, ...action.recentOrders];
		case "RESET_RECENT_ORDERS":
			return [];
		default:
			return state;
	}
};

export default recentOrdersReducer;
