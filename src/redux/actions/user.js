// import { checkToken } from "../../lib/login";
import { myFetch } from "../../lib/myFetch";

export const saveUserInfo = user => {
	return { type: "SAVE_USER_INFO", user: user };
};

export const fetchUserData = () => {
	// debugger;
	return dispatch => {
		myFetch("/users")
			.then(res => res.json())
			.then(json => {
				dispatch(saveUserInfo(json));
			})
			.catch(err => {
				return err;
			});
	};
};
