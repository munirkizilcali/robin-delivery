import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon, Button, Header, Modal } from "semantic-ui-react";

import { submitOrder } from "../redux/actions/order";
import { fetchRecentOrders } from "../redux/actions/recentOrders";

class CartSummary extends React.Component {
	state = {
		orderSubmitted: false,
		orderConfirm: false,
		orderTotal: 0
	};

	handleConfirmOrderClick = e => {
		this.setState({ orderConfirm: true });
		// {() =>
		// 				this.handleSubmitOrderClick(
		// 					this.props.user,
		// 					this.props.cart,
		// 					this.props.restaurant
		// 				)
		// 			}
	};

	handleSubmitOrderClick = (user, cart, restaurant, location) => {
		this.props
			.submitOrder(user, cart, restaurant, location)
			.then(() => this.setState({ orderSubmitted: true }))
			.then(() => this.props.fetchRecentOrders());
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
					onClick={() => this.handleConfirmOrderClick()}
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
								this.setState({
									orderSubmitted: false,
									orderConfirm: false
								})
							}
						>
							<Icon name="checkmark" /> Ok
						</Button>
					</Modal.Actions>
				</Modal>
				<Modal
					open={this.state.orderConfirm}
					size="small"
					onClose={() => this.setState({ orderSubmitted: false })}
				>
					<Header icon="archive" content="Order Details & Payment" />
					<Modal.Content>
						<p>
							Your selected items from{" "}
							{this.props.restaurant.name} is listed below. After
							reviewing them, please select a payment method:
						</p>
						<ul>
							{this.props.cart.map(item => {
								return (
									<li key={item.name}>
										<strong>{item.name}</strong> (x{
											item.count
										}):{" "}
										<italic>
											${item.count * item.price}
										</italic>
									</li>
								);
							})}
						</ul>
						<Header as="h4">
							Total: ${this.props.cart.reduce(
								(acc, b) => acc + b.price * b.count,
								0
							)}
						</Header>
					</Modal.Content>
					<Modal.Actions>
						<Button
							color="blue"
							onClick={() =>
								this.handleSubmitOrderClick(
									this.props.user,
									this.props.cart,
									this.props.restaurant,
									this.props.location
								)
							}
						>
							<Icon name="paypal" /> Paypal
						</Button>
						<Button
							color="green"
							onClick={() =>
								this.handleSubmitOrderClick(
									this.props.user,
									this.props.cart,
									this.props.restaurant,
									this.props.location
								)
							}
						>
							<Icon name="money" /> Cash
						</Button>
						<Button
							color="yellow"
							onClick={() =>
								this.handleSubmitOrderClick(
									this.props.user,
									this.props.cart,
									this.props.restaurant,
									this.props.location
								)
							}
						>
							<Icon name="credit card" /> Credit Card
						</Button>
						<Button
							color="red"
							inverted
							onClick={() =>
								this.setState({
									orderSubmitted: false,
									orderConfirm: false
								})
							}
						>
							<Icon name="checkmark" /> Cancel
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
		restaurant: state.selectedRestaurant,
		location: state.location
	};
};

const mapDispatchToProps = dispatch => {
	return {
		submitOrder: (user, cart, restaurant, location) =>
			dispatch(submitOrder(user, cart, restaurant, location)),
		fetchRecentOrders: () => dispatch(fetchRecentOrders())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartSummary);
