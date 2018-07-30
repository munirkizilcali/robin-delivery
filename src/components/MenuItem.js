import React from "react";
import { connect } from "react-redux";
import { Menu, Label } from "semantic-ui-react";

import { fetchItemData } from "../redux/actions/menuItem";
import { addCartItem, removeCartItem } from "../redux/actions/cart";
import { resetCart } from "../redux/actions/cart";

class MenuItem extends React.Component {
	state = {
		count: 0
	};

	handleItemDetailsClick = id => {
		this.props.fetchItemData(id);
	};

	handleAddItemClick = item => {
		if (
			this.props.cart.length !== 0 &&
			this.props.cart[0].restaurant_id !== item.restaurant_id
		) {
			this.props.resetCart();
		}
		this.props.addCartItem(item);
		this.setState({ count: this.state.count + 1 });
	};

	handleRemoveItemClick = item => {
		if (this.state.count > 0) {
			this.props.removeCartItem(item);
			this.setState({ count: this.state.count - 1 });
		}
	};

	render() {
		const cartItem = this.props.cart.find(
			cItem => cItem.id === this.props.item.id
		);

		return (
			<div>
				<Menu.Item active={!!cartItem}>
					<a
						onClick={() =>
							this.handleItemDetailsClick(this.props.item.id)
						}
					>
						{this.props.item.name
							? this.props.item.name.slice(0, 23)
							: "Untitled"}{" "}
						- ${this.props.item.price}
					</a>

					<Label
						as="button"
						onClick={() => this.handleAddItemClick(this.props.item)}
					>
						+
					</Label>
					<Label color={!!cartItem ? "green" : "grey"}>
						{" "}
						{!!cartItem ? cartItem.count : 0}
					</Label>
					<Label
						as="button"
						onClick={() =>
							this.handleRemoveItemClick(this.props.item)
						}
					>
						-
					</Label>
				</Menu.Item>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchItemData: id => dispatch(fetchItemData(id)),
		addCartItem: item => dispatch(addCartItem(item)),
		removeCartItem: item => dispatch(removeCartItem(item)),
		resetCart: () => dispatch(resetCart())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItem);
