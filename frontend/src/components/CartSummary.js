import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon, Button, Header, Modal } from "semantic-ui-react";

import { submitOrder } from "../redux/actions/order";

class CartSummary extends React.Component {
	state = {
		orderSubmitted: false
	};

	handleSubmitOrderClick = (user, cart, restaurant) => {
		this.props
			.submitOrder(user, cart, restaurant)
			.then(() => this.setState({ orderSubmitted: true }));
	};

	render() {
		return (
			<Menu.Item active={true} disabled={!(this.props.cart.length !== 0)}>
				Cart Total: ${" "}
				{this.props.cart.reduce((acc, b) => acc + b.price * b.count, 0)}{" "}
				<Label
					as="button"
					size="large"
					color={this.props.cart.length !== 0 ? "orange" : "grey"}
					onClick={() =>
						this.handleSubmitOrderClick(
							this.props.user,
							this.props.cart,
							this.props.restaurant
						)
					}
					disabled={!(this.props.cart.length !== 0)}
				>
					<Icon name="dollar" />
					Place Order
				</Label>
				<Modal
					open={this.state.orderSubmitted}
					basic
					size="small"
					onClose={() => this.setState({ orderSubmitted: false })}
				>
					<Header icon="archive" content="Order Submitted." />
					<Modal.Content>
						<p>
							Your order has been successful! You will be notified
							when your order has been picked up.
						</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							color="green"
							inverted
							onClick={() =>
								this.setState({ orderSubmitted: false })
							}
						>
							<Icon name="checkmark" /> Ok
						</Button>
					</Modal.Actions>
				</Modal>
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
