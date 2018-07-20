import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon } from "semantic-ui-react";

import ItemDetails from "./ItemDetails";
import { fetchItemData } from "../redux/actions/menuItem";

class RestaurantMenu extends React.Component {
	componentDidMount() {}

	handleItemDetailsClick = id => {
		this.props.fetchItemData(id);
	};

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
							<Menu.Item>
								{type}
								<Menu.Menu>
									{items[type].map(item => (
										<Menu.Item>
											<a
												onClick={() =>
													this.handleItemDetailsClick(
														item.id
													)
												}
											>
												{item.name}
											</a>

											<Label>+</Label>
											<Label>0</Label>
											<Label>-</Label>
										</Menu.Item>
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
		selectedMenuItem: state.selectedMenuItem
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchItemData: id => dispatch(fetchItemData(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantMenu);
