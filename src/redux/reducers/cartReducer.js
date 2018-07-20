const cartReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_CART_ITEM":
			if (state.find(cartItem => cartItem.id === action.item.id)) {
				let newState = state.slice();
				let item = newState.find(
					cartItem => cartItem.id === action.item.id
				);
				item.count += 1;
				return newState;
			} else {
				let item = action.item;
				item["count"] = 1;
				return [...state, item];
			}
		case "REMOVE_CART_ITEM":
			if (state.find(cartItem => cartItem.id === action.item.id)) {
				let newState = state.slice();
				let item = newState.find(
					cartItem => cartItem.id === action.item.id
				);
				if (item.count > 1) {
					item.count -= 1;
				} else {
					newState = state.filter(
						cartItem => cartItem.id !== action.item.id
					);
				}

				return newState;
			} else {
				return state;
			}
		case "RESET_CART":
			return [];
		default:
			return state;
	}
};

export default cartReducer;
