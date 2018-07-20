import { myFetch } from "../../lib/myFetch";

const setItemInfo = item => {
	return { type: "SET_ITEM_INFO", menuItem: item };
};

export const fetchItemData = id => {
	// debugger;
	return dispatch => {
		myFetch(`/menu_items/${id}`)
			.then(res => res.json())
			.then(json => {
				dispatch(setItemInfo(json));
				return Promise.resolve(true);
			})
			.catch(err => Promise.reject(false));
	};
};

export const unsetItemInfo = item => {
	return { type: "UNSET_ITEM_INFO" };
};
