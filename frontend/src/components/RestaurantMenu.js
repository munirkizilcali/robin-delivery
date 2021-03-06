import React from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import ItemDetails from "./ItemDetails";
import MenuItem from "./MenuItem";
import { resetRestaurantInfo } from "../redux/actions/restaurant";

class RestaurantMenu extends React.Component {
	componentDidMount() {}

	componentDidUpdate(prevProps) {}

	render() {
		const item_types = [
			...new Set(this.props.menu.map(item => item.item_type))
		];
		item_types.sort();
		let items = {};
		item_types.forEach(type => {
			items[type] = this.props.menu.filter(
				item => item.item_type === type
			);
		});

		return (
			<div>
				<Menu vertical fluid>
					{item_types.map(type => {
						return (
							<Menu.Item key={type}>
								{type}
								<Menu.Menu key={type + "menu"}>
									{items[type].map(item => (
										<MenuItem item={item} key={item.id} />
									))}
								</Menu.Menu>
							</Menu.Item>
						);
					})}
				</Menu>

				<ItemDetails selectedMenuItem={this.props.selectedMenuItem} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedMenuItem: state.selectedMenuItem,
		cart: state.cart
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetRestaurantInfo: () => dispatch(resetRestaurantInfo())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantMenu);
