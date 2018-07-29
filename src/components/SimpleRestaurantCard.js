import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image, Rating } from "semantic-ui-react";

import RestaurantMenu from "./RestaurantMenu";
import { restaurantView } from "../redux/actions/restaurant";

class SimpleRestaurantCard extends React.Component {
	componentDidMount() {}

	handleRestaurantClick = restaurant => {
		this.props.restaurantView(restaurant.place_id);
	};

	render() {
		return (
			<Card
				onClick={() =>
					this.handleRestaurantClick(this.props.restaurant)
				}
				raised
			>
				<Card.Content
					style={{
						backgroundColor: this.props.restaurant.opening_hours
							? this.props.restaurant.opening_hours.open_now
								? "#dcf1c0"
								: "#f2c1c1"
							: "#f2c1c1"
					}}
				>
					<Card.Header>
						<Icon name="food" />
						{this.props.restaurant.name}{" "}
						<Rating maxRating={1} disabled />{" "}
						{this.props.restaurant.rating}
					</Card.Header>
				</Card.Content>
				<Card.Content>
					<Card.Meta>
						<span className="date">
							{this.props.restaurant.vicinity}
						</span>{" "}
					</Card.Meta>
					<Card.Meta>
						<Icon name="road" />
						{this.props.distance} miles
					</Card.Meta>
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		restaurantView: id => dispatch(restaurantView(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleRestaurantCard);
