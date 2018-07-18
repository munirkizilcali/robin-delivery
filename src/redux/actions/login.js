import { callLoginApi } from "../../lib/login";

export function setLoginPending(isLoginPending) {
  return {
    type: "SET_LOGIN_PENDING",
    isLoginPending
  };
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

export function setToken(token) {
  return {
    type: "SET_TOKEN",
    token
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setToken(localStorage.getItem("token")));
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  };
}
