import React from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";

class HomeContainer extends React.Component {
	render() {
		return (
			<div>
				HomeContainer
				<SearchBar />
				<SearchResults />
				<Gmap />
			</div>
		);
	}
}

export default HomeContainer;
