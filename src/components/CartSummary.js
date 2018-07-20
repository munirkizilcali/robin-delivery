import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon } from "semantic-ui-react";

class CartSummary extends React.Component {
	render() {
		return (
			<Menu.Item active={true}>
				Cart Total: ${" "}
				{this.props.cart.reduce((acc, b) => acc + b.price * b.count, 0)}{" "}
				<Label as="button" size="large" color="orange">
					<Icon name="dollar" />
					Place Order
				</Label>
			</Menu.Item>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartSummary);
