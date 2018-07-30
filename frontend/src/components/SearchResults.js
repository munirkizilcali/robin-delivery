import React from "react";
import { connect } from "react-redux";
import {
	Rating,
	Menu,
	Header,
	Dropdown,
	Card,
	Checkbox,
	Grid
} from "semantic-ui-react";
import { orderBy, filter } from "lodash";

import { addResults, nearbyRestaurants } from "../redux/actions/searchResults";
import {
	fetchRestaurantData,
	restaurantView
} from "../redux/actions/restaurant";
import { setPosition } from "../redux/actions/location";
import SimpleRestaurantCard from "./SimpleRestaurantCard";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			activeRest: "",
			sortBy: "",
			order: "asc",
			open: false
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
		if (this.props.searchResults.length === 0) {
			this.props
				.setPosition()
				.then(() =>
					this.props.nearbyRestaurants(
						this.props.location,
						this.props.location.range
					)
				);
		}
	};
	priceLevelOutput = priceLevel =>
		priceLevel ? "$$$$$$$$".slice(0, priceLevel) : "No Price Info";

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

	handleOpenFilter = () => {
		this.setState(() => ({ open: !this.state.open }));
	};
	render() {
		return (
			<div>
				<Grid verticalAlign="middle">
					{" "}
					<Grid.Row fluid verticalAlign="middle">
						<Grid.Column width={11} mobile={11} fluid>
							<Dropdown
								placeholder="Sort by..."
								selection
								fluid
								options={[
									{
										text: "Popularity",
										value: " asc",
										icon: "sort alphabet ascending"
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
								style={{
									marginBottom: "10px"
								}}
							/>
						</Grid.Column>
						<Grid.Column width={2} mobile={1}>
							<Checkbox
								label="Open"
								onChange={this.handleOpenFilter}
								value={this.state.open}
								style={{
									marginBottom: "10px"
								}}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Card.Group stackable centered style={{ padding: "12px" }}>
					{this.props.searchResults.length !== 0
						? filter(
								orderBy(
									this.props.searchResults,
									this.state.sortBy !== "distance"
										? this.state.sortBy
										: [
												restaurant =>
													this.distanceRest(
														restaurant
													)
										  ],
									this.state.order
								),
								this.state.open
									? r => r.opening_hours.open_now
									: r => r.place_id
						  ).map(rest => (
								<SimpleRestaurantCard
									restaurant={rest}
									distance={this.distanceRest(rest)}
									key={rest.place_id}
								/>
						  ))
						: "No Results"}
					{this.props.nextToken !== "" ? (
						<Card onClick={() => this.handleLoadMoreClick()} raised>
							<Card.Content>
								<Card.Header>Load More...</Card.Header>
							</Card.Content>
						</Card>
					) : (
						""
					)}
				</Card.Group>
			</div>
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
		restaurantView: id => dispatch(restaurantView(id)),
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