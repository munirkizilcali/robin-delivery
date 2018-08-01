const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SAVE_USER_INFO":
			return { ...state, ...action.user };
		case "RESET_USER_INFO":
			return {};
		default:
			return state;
	}
};

export default userReducer;
