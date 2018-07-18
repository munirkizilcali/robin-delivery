import { checkToken } from "../../lib/login";

export const saveUserInfo = user => {
	return { type: "LOGIN", user };
};

