import { myFetch } from "../../lib/myFetch";

export function callLoginApi(email, password, callback) {
  // setTimeout(() => {
  //  if (email === "admin@example.com" && password === "admin") {
  //    return callback(null);
  //  } else {
  //    return callback(new Error("Invalid email and password"));
  //  }
  // }, 1000);
  const request = {
    auth: { email: email, password: password }
  };
  return myFetch("/user_token", {
    body: JSON.stringify(request)
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.jwt);
      return callback(null);
    })
    .catch(err => callback(err));
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: "SET_LOGIN_SUCCESS",
    isLoginSuccess
  };
}

export function setLoginError(loginError) {
  return {
    type: "SET_LOGIN_ERROR",
    loginError
  };
}

export function logout() {
  return dispatch => {
    dispatch(setLoginSuccess(false));
    localStorage.removeItem("token");
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  };
}
