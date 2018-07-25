import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image, Rating } from "semantic-ui-react";

import RestaurantMenu from "./RestaurantMenu";
import { resetCart } from "../redux/actions/cart";

class RestaurantDetails extends React.Component {
	componentDidMount() {}

	componentDidUpdate(previousProps) {
		if (previousProps.restaurant.id !== this.props.restaurant.id) {
			this.props.resetCart();
		}
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
					<Card.Header>{this.props.restaurant.name}</Card.Header>
					<Card.Meta>
						<span className="date">
							<Icon name="food" /> {this.props.restaurant.address}
						</span>{" "}
						<Rating
							defaultRating={this.props.restaurant.google_rating}
							maxRating={5}
							disabled
							icon="heart"
						/>
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
		restaurant: state.selectedRestaurant
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetCart: () => dispatch(resetCart())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantDetails);
