const loginReducer = (
	state = {
		isLoginSuccess: false,
		isLoginPending: false,
		loginError: null,
		token: ""
	},
	action
) => {
	switch (action.type) {
		case "SET_LOGIN_PENDING":
			return Object.assign({}, state, {
				isLoginPending: action.isLoginPending
			});

		case "SET_LOGIN_SUCCESS":
			return Object.assign({}, state, {
				isLoginSuccess: action.isLoginSuccess
			});

		case "SET_LOGIN_ERROR":
			return Object.assign({}, state, {
				loginError: action.loginError
			});

		case "SET_TOKEN":
			return { ...state, token: action.token };

		default:
			return state;
	}
};

export default loginReducer;
