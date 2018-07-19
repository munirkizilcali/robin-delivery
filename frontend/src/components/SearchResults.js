import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { myFetch } from "../lib/myFetch";
import { addResults } from "../redux/actions/searchResults";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: []
		};
	}

	componentDidMount = () => {
		myFetch("/restaurants")
			.then(resp => resp.json())
			.then(json => {
				this.props.addResults(json);
			});
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
	return {
		addResults: json => dispatch(addResults(json))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
