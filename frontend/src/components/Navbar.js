import React from "react";
import { Menu, Image, Icon, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import logoSquare from "../assets/logo_square.png";

import Logout from "./Logout";
import CartSummary from "./CartSummary";

class Navbar extends React.Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Menu>
				<Menu.Item
					name="logo"
					active={activeItem === "logo"}
					onClick={this.handleItemClick}
				>
					<Image src={logoSquare} size="mini" />
				</Menu.Item>

				<Menu.Item
					name="home"
					active={activeItem === "home"}
					onClick={this.handleItemClick}
				>
					<Icon name="location arrow" size="large" />Nearby
					Restaurants
				</Menu.Item>

				<Menu.Item
					name="recentOrders"
					active={activeItem === "recentOrders"}
					onClick={this.handleItemClick}
				>
					<Icon name="history" size="large" /> Recent Orders
				</Menu.Item>
				<Menu.Menu position="right">
					{<CartSummary />}
					<Menu.Item>
						<Input
							icon="search"
							placeholder="Search for a restaurant"
						/>
					</Menu.Item>
					<Menu.Item
						name="logout"
						active={activeItem === "logout"}
						onClick={this.handleItemClick}
					>
						<Icon name="log out" size="large" /> <Logout />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart
	};
};

export default connect(mapStateToProps)(Navbar);
