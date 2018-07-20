const menuItemReducer = (state = {}, action) => {
	switch (action.type) {
		case "SET_ITEM_INFO":
			return { ...state, ...action.menuItem };
		case "UNSET_ITEM_INFO":
			return {};
		default:
			return state;
	}
};

export default menuItemReducer;
