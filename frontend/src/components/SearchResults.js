import React from "react";
import { connect } from "react-redux";
import { List, Image, Rating, Menu, Header } from "semantic-ui-react";

import { myFetch } from "../lib/myFetch";
import { addResults, nearbyRestaurants } from "../redux/actions/searchResults";
import { fetchRestaurantData } from "../redux/actions/restaurant";
import { setPosition } from "../redux/actions/location";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			activeRest: ""
		};
	}

	componentDidMount = () => {
		this.props
			.setPosition()
			.then(() =>
				this.props.nearbyRestaurants(
					this.props.location,
					this.props.location.range * 1609
				)
			);
	};

	handleRestaurantClick = restaurant => {
		this.setState({ activeRest: restaurant });
		this.props.fetchRestaurantData(restaurant.place_id);
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
								<Header as="h5">{rest.name}</Header>Rating:
								<Rating
									defaultRating={rest.rating}
									maxRating={5}
									disabled
									icon="heart"
								/>{" "}
								- Price Level:
								<Rating
									defaultRating={rest.price_level}
									maxRating={5}
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
		searchResults: state.searchResults,
		location: state.location
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addResults: json => dispatch(addResults(json)),
		fetchRestaurantData: id => dispatch(fetchRestaurantData(id)),
		nearbyRestaurants: (location, radius) =>
			dispatch(nearbyRestaurants(location, radius)),
		setPosition: () => dispatch(setPosition())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
