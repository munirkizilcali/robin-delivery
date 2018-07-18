import { combineReducers } from "redux";

import searchResultsReducer from "./searchResultsReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
	searchResults: searchResultsReducer,
	login: loginReducer,
	user: userReducer
});

export default rootReducer;
