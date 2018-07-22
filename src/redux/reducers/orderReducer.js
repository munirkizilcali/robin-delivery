const orderReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_ORDER_INFO":
			return { ...state, ...action.orderDetails };
		case "RESET_ORDER_INFO":
			return {};
		default:
			return state;
	}
};

export default orderReducer;
