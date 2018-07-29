import { myFetch } from "../../lib/myFetch";
import { fetchUserData } from "./user";
import { fetchRecentOrders } from "./recentOrders";

export function callLoginApi(email, password, callback) {
  const request = {
    auth: { email: email, password: password }
  };
  return myFetch("/user_token", {
    body: JSON.stringify(request)
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
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
        dispatch(fetchUserData()).then(() => dispatch(fetchRecentOrders()));
      } else {
        debugger;
        dispatch(setLoginError(error));
      }
    });
  };
}
