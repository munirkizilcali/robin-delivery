import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import rootReducer from "./reducers/rootReducer";
import { history } from "./history";

export const store = createStore(
	connectRouter(history)(rootReducer),
	compose(
		applyMiddleware(routerMiddleware(history), thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
