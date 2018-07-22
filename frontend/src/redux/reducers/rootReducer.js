import { combineReducers } from "redux";

import searchResultsReducer from "./searchResultsReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import restaurantReducer from "./restaurantReducer";
import menuItemReducer from "./menuItemReducer";
import cartReducer from "./cartReducer";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
	searchResults: searchResultsReducer,
	login: loginReducer,
	user: userReducer,
	selectedRestaurant: restaurantReducer,
	selectedMenuItem: menuItemReducer,
	cart: cartReducer,
	location: locationReducer
});

export default rootReducer;
