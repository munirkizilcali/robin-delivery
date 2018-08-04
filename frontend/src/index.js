import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { store } from "./redux/store";
import { history } from "./redux/history";

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history} basename="/robin-delivery">
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
