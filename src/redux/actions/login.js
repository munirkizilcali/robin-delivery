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
      // debugger;
      console.log(res);
      localStorage.setItem("token", res.jwt);
      return callback(null);
    })
    .catch(err => callback(err));
}

function checkToken() {
  return myFetch("/users")
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.status) {
        return Promise.resolve(true);
      }
    })
    .catch(err => Promise.reject(err));
}

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

export function setTokenValidityPending(isTokenValidityPending) {
  return {
    type: "SET_TOKEN_VALIDITY_PENDING",
    isTokenValidityPending
  };
}

export function checkTokenValidity() {
  debugger;
  return dispatch => {
    dispatch(setTokenValidityPending(true));
    checkToken()
      .then(res => {
        dispatch(setTokenValidityPending(false));
        dispatch(setLoginSuccess(true));
        return Promise.resolve(res);
      })
      .catch(err => {
        localStorage.removeItem("token");
        return Promise.reject(err);
      });
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
