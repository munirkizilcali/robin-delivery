import React from "react";
import { Menu, Image, Icon, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import logoSquare from "../assets/logo_square.png";

import Logout from "./Logout";
import CartSummary from "./CartSummary";
import { nearbyRestaurants } from "../redux/actions/searchResults";
import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";

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

				<RangeSlider />

				<Menu.Item
					name="recentOrders"
					active={activeItem === "recentOrders"}
					onClick={this.handleItemClick}
				>
					<Icon name="history" size="large" /> Recent Orders
				</Menu.Item>
				<Menu.Menu position="right">
					{<CartSummary />}
					<SearchBar />
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
		cart: state.cart,
		range: state.location.range,
		location: state.location,
		searchTerm: state.searchTerm
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nearbyRestaurants: (location, range, searchTerm) =>
			dispatch(nearbyRestaurants(location, range, searchTerm))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
