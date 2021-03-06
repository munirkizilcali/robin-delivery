import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Rating, Label, Image } from "semantic-ui-react";
import moment from "moment";

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
				style={{ marginRight: "14px" }}
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
					<Label
						color={
							this.props.restaurant.opening_hours
								? this.props.restaurant.opening_hours.open_now
									? "green"
									: "red"
								: "red"
						}
						ribbon="right"
					>
						<Icon
							name={
								this.props.restaurant.opening_hours
									? this.props.restaurant.opening_hours
											.open_now
										? "spoon"
										: "stop"
									: "stop"
							}
						/>
						{this.props.restaurant.opening_hours
							? this.props.restaurant.opening_hours.open_now
								? "Open"
								: "Closed"
							: "Closed"}
					</Label>
					<Card.Header>
						<Icon name="food" />
						{this.props.restaurant.name}{" "}
						<Rating maxRating={1} disabled />{" "}
						{this.props.restaurant.rating}
					</Card.Header>
					<Card.Meta>
						<Icon name="time" />
						Est. Delivery Time:{" "}
						{moment
							.utc(
								this.props.restaurant.distance.duration.value *
									2 *
									1000
							)
							.format("m")}{" "}
						minutes
					</Card.Meta>
				</Card.Content>
				<Card.Content>
					<Card.Meta>
						<span className="date">
							{this.props.restaurant.vicinity}
						</span>{" "}
					</Card.Meta>
					<Card.Meta>
						<Icon name="road" />
						{this.props.restaurant.distance.distance.text}
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
