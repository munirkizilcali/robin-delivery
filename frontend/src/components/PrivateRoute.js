import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let loggedIn = rest.loggedIn;
  return (
    <Route
      {...rest}
      render={props => {
        console.log(loggedIn);
        return !!localStorage.token && loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
