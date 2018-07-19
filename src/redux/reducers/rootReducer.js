import { combineReducers } from "redux";

import searchResultsReducer from "./searchResultsReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import restaurantReducer from './restaurantReducer'

const rootReducer = combineReducers({
	searchResults: searchResultsReducer,
	login: loginReducer,
	user: userReducer,
	selectedRestaurant: restaurantReducer
});

export default rootReducer;
