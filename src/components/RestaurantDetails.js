import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image, Rating } from "semantic-ui-react";

import RestaurantMenu from "./RestaurantMenu";
import { resetCart } from "../redux/actions/cart";
import { fetchRestaurantData } from "../redux/actions/restaurant";

class RestaurantDetails extends React.Component {
	componentDidMount() {
		this.props.fetchRestaurantData(this.props.match.params.id);
	}

	componentDidUpdate(previousProps) {
		// if (this.props.cart.length !== 0) {
		// 	if (previousProps.restaurant.id !== this.props.cart.restaurant_id) {
		// 		this.props.resetCart();
		// 	}
		// }
	}

	render() {
		return (
			<Card centered fluid>
				<figure
					style={{
						overflow: "hidden",
						margin: 0
					}}
				>
					{this.props.restaurant.photo_url !== "NonPhoto" ? (
						<Image
							src={this.props.restaurant.photo_url}
							rounded
							style={{
								display: "block",
								width: "100%",
								margin: "-15.875% 0"
							}}
						/>
					) : (
						""
					)}
				</figure>
				<Card.Content>
					<Card.Header>
						{this.props.restaurant.name}{" "}
						<Rating defaultRating={1} maxRating={1} disabled />
						{this.props.restaurant.google_rating}
					</Card.Header>
					<Card.Meta>
						<span className="date">
							<Icon name="food" /> {this.props.restaurant.address}
						</span>{" "}
					</Card.Meta>
					<Card.Description>
						{this.props.restaurant.motto}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					{Array.isArray(this.props.restaurant.menu_items) ? (
						<RestaurantMenu
							menu={this.props.restaurant.menu_items}
						/>
					) : (
						""
					)}
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		restaurant: state.selectedRestaurant,
		cart: state.cart
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetCart: () => dispatch(resetCart()),
		fetchRestaurantData: id => dispatch(fetchRestaurantData(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantDetails);
