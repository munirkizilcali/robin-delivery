import React from "react";

import Login from "./Login";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";

class PageContainer extends React.Component {
	render() {
		return (
			<div>
				PageContainer
				<Login />
				<SearchBar />
				<SearchResults />
				<Gmap />
			</div>
		);
	}
}

export default PageContainer;
