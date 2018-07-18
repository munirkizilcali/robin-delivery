import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addResults } from "../redux/actions/searchResults";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: []
		};
	}

	componentDidMount = () => {
		// fetch("http://localhost:3000/api/v1/restaurants")
		// 	.then(resp => resp.json())
		// 	.then(json => {
		// 		this.props.addResults(json);
		// 	});
	};
	render() {
		return (
			<div>
				{this.props.searchResults.length !== 0
					? this.props.searchResults.map(rest => <li>{rest.name}</li>)
					: "No Results"}
			</div>
		);
	}
}

// export default SearchResults;
const mapStateToProps = state => {
	return {
		searchResults: state.searchResults
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ addResults: addResults }, dispatch);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
