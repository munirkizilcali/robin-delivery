import React from "react";
import { connect } from "react-redux";
import { Menu, Label } from "semantic-ui-react";

import { fetchItemData } from "../redux/actions/menuItem";
import { addCartItem, removeCartItem } from "../redux/actions/cart";

class MenuItem extends React.Component {
	state = {
		count: 0
	};

	componentDidMount() {}

	handleItemDetailsClick = id => {
		this.props.fetchItemData(id);
	};

	handleAddItemClick = item => {
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
		return (
			<div>
				<Menu.Item active={!!this.state.count}>
					<a
						onClick={() =>
							this.handleItemDetailsClick(this.props.item.id)
						}
					>
						{this.props.item.name} - ${this.props.item.price}
					</a>

					<Label
						as="button"
						onClick={() => this.handleAddItemClick(this.props.item)}
					>
						+
					</Label>
					<Label color={this.state.count > 0 ? "green" : "grey"}>
						{" "}
						{this.state.count}
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
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchItemData: id => dispatch(fetchItemData(id)),
		addCartItem: item => dispatch(addCartItem(item)),
		removeCartItem: item => dispatch(removeCartItem(item))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItem);
