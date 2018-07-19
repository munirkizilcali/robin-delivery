import React from "react";
import { connect } from "react-redux";
import {List, Image} from 'semantic-ui-react'

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
			<List animated verticalAlign='middle' relaxed celled>
				{this.props.searchResults.length !== 0
					? this.props.searchResults.map(rest => <List.Item><Image avatar src={rest.logo} /><List.Content><List.Header>{rest.name}</List.Header><List.Description>{rest.motto.slice(0,30)+'...'}</List.Description></List.Content></List.Item>)
					: "No Results"}
			</List>
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
