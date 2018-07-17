import React from "react";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: []
		};
	}

	componentDidMount() {
		fetch("http://localhost:3000/api/v1/restaurants")
			.then(resp => resp.json())
			.then(json => this.setState({ searchResults: json }));
	}
	render() {
		return (
			<div>
				{this.state.searchResults.length !== 0
					? this.state.searchResults.map(rest => <li>{rest.name}</li>)
					: "No Results"}
			</div>
		);
	}
}

export default SearchResults;
