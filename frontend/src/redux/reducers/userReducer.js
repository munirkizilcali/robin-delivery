const userReducer = (state = {}, action) => {
	switch (action.type) {
		case "SAVE_USER_INFO":
			return { ...state, ...action.user };
		default:
			return state;
	}
};

export default userReducer;
