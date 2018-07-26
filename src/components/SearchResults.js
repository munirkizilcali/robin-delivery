import React from "react";
import { connect } from "react-redux";
import { Rating, Menu, Header, Dropdown } from "semantic-ui-react";
import { sortBy } from "lodash";

import { addResults, nearbyRestaurants } from "../redux/actions/searchResults";
import { fetchRestaurantData } from "../redux/actions/restaurant";
import { setPosition } from "../redux/actions/location";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			activeRest: "",
			sortBy: "",
			order: "asc"
		};
	}

	distance(lon2, lat2) {
		let toRad = value => (value * Math.PI) / 180;
		let R = 6371; // Radius of the earth in km
		let dLat = toRad(
			lat2 - parseFloat(this.props.location.coords.latitude)
		); // Javascript functions in radians
		let dLon = toRad(
			lon2 - parseFloat(this.props.location.coords.longitude)
		);
		let a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(this.props.location.coords.latitude)) *
				Math.cos(toRad(lat2)) *
				Math.sin(toRad(dLon / 2)) *
				Math.sin(dLon / 2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let d = R * c; // Distance in km
		return d.toFixed(1);
	}

	distanceRest = restaurant => {
		return this.distance(
			restaurant.geometry.location.lng,
			restaurant.geometry.location.lat
		);
	};

	componentDidMount = () => {
		this.props
			.setPosition()
			.then(() =>
				this.props.nearbyRestaurants(
					this.props.location,
					this.props.location.range
				)
			);
	};
	priceLevelOutput = priceLevel =>
		priceLevel ? "$$$$$$$$".slice(0, priceLevel) : "No Price Info";

	handleRestaurantClick = restaurant => {
		this.setState({ activeRest: restaurant });
		this.props.fetchRestaurantData(restaurant.place_id);
	};

	handleLoadMoreClick = () => {
		// debugger;
		this.props.nearbyRestaurants(
			this.props.location,
			this.props.location.range,
			null,
			this.props.nextToken
		);
	};

	handleSortChange = (e, d) => {
		this.setState({
			sortBy: d.value.split(" ")[0],
			order: d.value.split(" ")[1]
		});
	};
	render() {
		return (
			<Menu
				pointing
				vertical
				fluid
				style={{
					height: "100%",
					overflowY: "scroll"
				}}
			>
				<Menu.Item>
					<Dropdown
						placeholder="Sort by..."
						fluid
						selection
						options={[
							{
								text: "Popularity (Asc)",
								value: " asc",
								icon: "sort alphabet ascending"
							},
							{
								text: "Popularity (Desc)",
								value: " desc",
								icon: "sort alphabet descending"
							},
							{
								text: "Name (Asc)",
								value: "name asc",
								icon: "sort alphabet ascending"
							},
							{
								text: "Name (Desc)",
								value: "name desc",
								icon: "sort alphabet descending"
							},
							{
								text: "Rating (Asc)",
								value: "rating asc",
								icon: "sort numeric ascending"
							},

							{
								text: "Rating (Desc)",
								value: "rating desc",
								icon: "sort numeric descending"
							},
							{
								text: "Distance (Asc)",
								value: "distance asc",
								icon: "sort numeric ascending"
							},
							{
								text: "Distance (Desc)",
								value: "distance desc",
								icon: "sort numeric descending"
							},
							{
								text: "Price (Asc)",
								value: "price_level asc",
								icon: "sort numeric ascending"
							},
							{
								text: "Price (Desc)",
								value: "price_level desc",
								icon: "sort numeric descending"
							}
						]}
						onChange={this.handleSortChange}
					/>
				</Menu.Item>
				{this.props.searchResults.length !== 0
					? (this.state.order === "asc"
							? sortBy(
									this.props.searchResults,
									this.state.sortBy !== "distance"
										? this.state.sortBy
										: [
												restaurant =>
													this.distanceRest(
														restaurant
													)
										  ]
							  )
							: sortBy(
									this.props.searchResults,
									this.state.sortBy !== "distance"
										? this.state.sortBy
										: [
												restaurant =>
													this.distanceRest(
														restaurant
													)
										  ]
							  ).reverse()
					  ).map(rest => (
							<Menu.Item
								active={this.state.activeRest.id === rest.id}
								onClick={() => this.handleRestaurantClick(rest)}
								key={rest.id}
							>
								<Header as="h5">
									{rest.name} -{" "}
									{rest.price_level
										? this.priceLevelOutput(
												rest.price_level
										  )
										: ""}
									<Rating
										defaultRating={rest.rating}
										maxRating={rest.rating}
										disabled
										icon="heart"
									/>
									{this.distance(
										rest.geometry.location.lng,
										rest.geometry.location.lat
									)}{" "}
									miles
								</Header>
							</Menu.Item>
					  ))
					: "No Results"}
				{this.props.nextToken !== "" ? (
					<Menu.Item onClick={() => this.handleLoadMoreClick()}>
						<Header as="h5">Load More...</Header>
					</Menu.Item>
				) : (
					""
				)}
			</Menu>
		);
	}
}

// export default SearchResults;
const mapStateToProps = state => {
	return {
		searchResults: state.searchResults,
		location: state.location,
		nextToken: state.nextToken
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addResults: json => dispatch(addResults(json)),
		fetchRestaurantData: id => dispatch(fetchRestaurantData(id)),
		nearbyRestaurants: (location, radius, searchTerm, nextToken) =>
			dispatch(
				nearbyRestaurants(location, radius, searchTerm, nextToken)
			),
		setPosition: () => dispatch(setPosition())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
