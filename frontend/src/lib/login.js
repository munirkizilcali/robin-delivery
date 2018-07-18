import { myFetch } from "./myFetch";

export function callLoginApi(email, password, callback) {
	// setTimeout(() => {
	// 	if (email === "admin@example.com" && password === "admin") {
	// 		return callback(null);
	// 	} else {
	// 		return callback(new Error("Invalid email and password"));
	// 	}
	// }, 1000);
	const request = {
		auth: { email: email, password: password }
	};
	return myFetch("http://localhost:3000/api/v1/user_token", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(request)
	})
		.then(res => {
			console.log(res);
			return res.json();
		})
		.then(res => {
			// debugger;
			console.log(res);
			localStorage.setItem("token", res.jwt);
			return callback(null);
		})
		.catch(err => callback(err));
}

export function checkToken(token) {
	return myFetch("http://localhost:3000/api/v1/users", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(res => {
			debugger;
			return res.json();
		})
		.catch(err => err);
}
