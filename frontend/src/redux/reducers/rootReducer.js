import { combineReducers } from "redux";

import searchResultsReducer from "./searchResultsReducer";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import restaurantReducer from "./restaurantReducer";
import menuItemReducer from "./menuItemReducer";
import cartReducer from "./cartReducer";
import locationReducer from "./locationReducer";
import recentOrdersReducer from "./recentOrdersReducer";
import searchReducer from "./searchReducer";
import nextTokenReducer from "./nextTokenReducer";

const rootReducer = combineReducers({
	searchResults: searchResultsReducer,
	login: loginReducer,
	user: userReducer,
	selectedRestaurant: restaurantReducer,
	selectedMenuItem: menuItemReducer,
	cart: cartReducer,
	location: locationReducer,
	recentOrders: recentOrdersReducer,
	searchTerm: searchReducer,
	nextToken: nextTokenReducer
});

export default rootReducer;
