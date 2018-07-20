import React from "react";
import { connect } from "react-redux";
import { List, Image, Rating, Menu, Header } from "semantic-ui-react";

import { myFetch } from "../lib/myFetch";
import { addResults } from "../redux/actions/searchResults";
import { fetchRestaurantData } from "../redux/actions/restaurant";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			activeRest: ""
		};
	}

	componentDidMount = () => {
		myFetch("/restaurants")
			.then(resp => resp.json())
			.then(json => {
				this.props.addResults(json);
			});
	};

	handleRestaurantClick = restaurant => {
		this.setState({ activeRest: restaurant });
		this.props.fetchRestaurantData(restaurant.id);
	};
	render() {
		return (
			<Menu
				pointing
				vertical
				style={{ height: "90vh", overflowY: "scroll" }}
				fluid
			>
				{this.props.searchResults.length !== 0
					? this.props.searchResults.map(rest => (
							<Menu.Item
								active={this.state.activeRest.id === rest.id}
								onClick={() => this.handleRestaurantClick(rest)}
								key={rest.id}
							>
								<Image src={rest.logo} avatar />
								{rest.name} ({rest.number_of_orders})
								<Rating
									defaultRating={rest.rating}
									maxRating={10}
									disabled
								/>
							</Menu.Item>
					  ))
					: "No Results"}
			</Menu>
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
		addResults: json => dispatch(addResults(json)),
		fetchRestaurantData: id => dispatch(fetchRestaurantData(id))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
