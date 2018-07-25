const searchResultsReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_RESULTS":
			return [...action.results];
		case "ADD_MORE_RESULTS":
			return [...state, ...action.results];
		default:
			return state;
	}
};

export default searchResultsReducer;
