const nextTokenReducer = (state = "", action) => {
	switch (action.type) {
		case "SET_NEXT_TOKEN":
			return action.nextToken;
		default:
			return state;
	}
};

export default nextTokenReducer;
