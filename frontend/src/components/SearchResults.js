import React from "react";
import { connect } from "react-redux";
import {
	Dropdown,
	Card,
	Checkbox,
	Grid,
	Loader,
	Dimmer
} from "semantic-ui-react";
import { orderBy, filter } from "lodash";

import { addResults, nearbyRestaurants } from "../redux/actions/searchResults";
import {
	fetchRestaurantData,
	restaurantView
} from "../redux/actions/restaurant";
import {
	setPosition,
	fetchDistances,
	setDistancesForSearchResults
} from "../redux/actions/location";
import SimpleRestaurantCard from "./SimpleRestaurantCard";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			activeRest: "",
			sortBy: "",
			order: "asc",
			open: false,
			loading: false,
			loadingMore: false
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
			this.setState({ loading: true });
			this.props
				.setPosition()
				.then(() =>
					this.props.nearbyRestaurants(
						this.props.location,
						this.props.location.range
					)
				)
				.then(() => this.setState({ loading: false }));
		}
	};
	priceLevelOutput = priceLevel =>
		priceLevel ? "$$$$$$$$".slice(0, priceLevel) : "No Price Info";

	handleLoadMoreClick = () => {
		this.setState({ loadingMore: true });
		this.props
			.nearbyRestaurants(
				this.props.location,
				this.props.location.range,
				null,
				this.props.nextToken
			)
			.then(() => this.setState({ loadingMore: false }));
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
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={14} mobile={11}>
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
										text: "Delivery Time (Asc)",
										value: "time asc",
										icon: "sort numeric ascending"
									},
									{
										text: "Delivery Time (Desc)",
										value: "time desc",
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
						</Grid.Column>
						<Grid.Column width={2} mobile={1}>
							<Checkbox
								label="Open"
								onChange={this.handleOpenFilter}
								checked={this.state.open}
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row fluid>
						<Grid.Column width={16} mobile={16} fluid>
							<Card.Group
								stackable
								centered
								style={{ padding: "0px" }}
							>
								{this.props.searchResults.length !== 0 ? (
									filter(
										orderBy(
											this.props.searchResults,
											this.state.sortBy !== "time"
												? this.state.sortBy !==
												  "distance"
													? this.state.sortBy
													: [
															restaurant =>
																this.distanceRest(
																	restaurant
																)
													  ]
												: [
														restaurant =>
															restaurant.distance
																.duration.value
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
								) : (
									<div>
										No result.
										<Dimmer
											active={this.state.loading}
											page
										>
											<Loader>Loading... </Loader>
										</Dimmer>
									</div>
								)}
								{this.props.nextToken !== "" ? (
									<Card
										onClick={() =>
											this.handleLoadMoreClick()
										}
										raised
									>
										<Card.Content>
											<Card.Header>
												{this.state.loadingMore ? (
													<Dimmer active>
														<Loader>Loading</Loader>
													</Dimmer>
												) : (
													"Load More..."
												)}
											</Card.Header>
										</Card.Content>
									</Card>
								) : (
									""
								)}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
				</Grid>
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
		setPosition: () => dispatch(setPosition()),
		fetchDistances: (origin, destinations, method) =>
			dispatch(fetchDistances(origin, destinations, method)),
		setDistancesForSearchResults: (origin, method, searchResults) =>
			dispatch(
				setDistancesForSearchResults(origin, method, searchResults)
			)
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchResults);
