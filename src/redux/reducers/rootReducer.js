import { combineReducers } from "redux";

import searchResultsReducer from "./searchResultsReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import restaurantReducer from "./restaurantReducer";
import menuItemReducer from "./menuItemReducer";

const rootReducer = combineReducers({
	searchResults: searchResultsReducer,
	login: loginReducer,
	user: userReducer,
	selectedRestaurant: restaurantReducer,
	selectedMenuItem: menuItemReducer
});

export default rootReducer;
