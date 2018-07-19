import React from "react";
import { connect } from "react-redux";
import { Menu, Label, Icon } from "semantic-ui-react";

class RestaurantMenu extends React.Component {
	componentDidMount() {}

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
			<Menu vertical fluid>
				{item_types.map(type => {
					return (
						<Menu.Item>
							{type}
							<Menu.Menu>
								{items[type].map(item => (
									<Menu.Item>
										{item.name}

										<Icon name="plus" />

										<Label>1</Label>
									</Menu.Item>
								))}
							</Menu.Menu>
						</Menu.Item>
					);
				})}
			</Menu>
		);
	}
}

export default RestaurantMenu;
