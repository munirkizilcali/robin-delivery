const loginReducer = (
	state = {
		isLoginSuccess: false,
		isLoginPending: false,
		isTokenValidityPending: false,
		loginError: null
	},
	action
) => {
	switch (action.type) {
		case "SET_LOGIN_SUCCESS":
			return Object.assign({}, state, {
				isLoginSuccess: action.isLoginSuccess
			});

		case "SET_LOGIN_ERROR":
			return Object.assign({}, state, {
				loginError: action.loginError
			});

		default:
			return state;
	}
};

export default loginReducer;
