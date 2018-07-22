import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon } from "semantic-ui-react";

import { submitOrder } from "../redux/actions/order";

class CartSummary extends React.Component {
	handleSubmitOrderClick = (user, cart, restaurant) => {
		this.props
			.submitOrder(user, cart, restaurant)
			.then(() => alert("Your Order is submitted"));
	};

	render() {
		return (
			<Menu.Item active={true}>
				Cart Total: ${" "}
				{this.props.cart.reduce((acc, b) => acc + b.price * b.count, 0)}{" "}
				<Label
					as="button"
					size="large"
					color="orange"
					onClick={() =>
						this.handleSubmitOrderClick(
							this.props.user,
							this.props.cart,
							this.props.restaurant
						)
					}
				>
					<Icon name="dollar" />
					Place Order
				</Label>
			</Menu.Item>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
		user: state.user,
		restaurant: state.selectedRestaurant
	};
};

const mapDispatchToProps = dispatch => {
	return {
		submitOrder: (user, cart, restaurant) =>
			dispatch(submitOrder(user, cart, restaurant))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartSummary);
