export const addCartItem = item => {
	return { type: "ADD_CART_ITEM", item };
};

export const removeCartItem = item => {
	return { type: "REMOVE_CART_ITEM", item };
};

export const resetCart = () => {
	return { type: "RESET_CART" };
};
