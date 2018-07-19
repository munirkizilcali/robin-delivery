import { setLoginSuccess } from "./login";
import { myFetch } from "../../lib/myFetch";

export const saveUserInfo = user => {
	return { type: "SAVE_USER_INFO", user: user };
};

export const fetchUserData = () => {
	// debugger;
	return dispatch => {
		myFetch("/users/check")
			.then(res => res.json())
			.then(json => {
				dispatch(saveUserInfo(json));
				dispatch(setLoginSuccess(true));
				return Promise.resolve(true);
			})
			.catch(err => Promise.reject(false));
	};
};
