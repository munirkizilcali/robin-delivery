import React from "react";
import { Menu, Image, Icon, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import logoSquare from "../assets/logo_square.png";
import logoTitle from "../assets/logo_title.png";
import { Link } from "react-router-dom";

import Logout from "./Logout";
import CartSummary from "./CartSummary";
import { nearbyRestaurants } from "../redux/actions/searchResults";
import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";

class Navbar extends React.Component {
	state = {
		hide: true
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleHideClick = e => {
		e.preventDefault();
		this.setState({ hide: !this.state.hide });
	};

	render() {
		const { activeItem } = this.state;

		return (
			<Grid style={{ position: "fixed", zIndex: "100", width: "94%" }}>
				<Grid.Row only="tablet mobile">
					<Menu stackable fluid>
						<Menu.Item
							name="logo"
							active={false}
							onClick={() =>
								this.setState({ hide: !this.state.hide })
							}
						>
							<Image src={logoSquare} size="mini" />
							<Image src={logoTitle} size="medium" />
						</Menu.Item>
					</Menu>
					{!this.state.hide ? (
						<Menu stackable fluid>
							<RangeSlider
								handleHideClick={this.handleHideClick}
							/>
							<Menu.Item
								onClick={() =>
									this.setState({ hide: !this.state.hide })
								}
							>
								<Link to="/recentorders">
									<Icon name="history" size="large" />
									Recent Orders
								</Link>
							</Menu.Item>
							<Menu.Menu position="right">
								{
									<CartSummary
										handleHideClick={this.handleHideClick}
									/>
								}
								<SearchBar />
								<Menu.Item
									name="logout"
									active={activeItem === "logout"}
									onClick={this.handleItemClick}
								>
									<Icon name="log out" size="large" />{" "}
									<Logout />
								</Menu.Item>
							</Menu.Menu>
						</Menu>
					) : (
						""
					)}
				</Grid.Row>
				<Grid.Row only="computer">
					<Menu compact>
						<Menu.Item
							name="logo"
							active={activeItem === "logo"}
							onClick={this.handleItemClick}
						>
							<Image src={logoSquare} size="mini" />
						</Menu.Item>

						<RangeSlider />
						<Menu.Item>
							<Link to="/recentorders">
								<Icon name="history" size="large" />
								Recent Orders
							</Link>
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
				</Grid.Row>
			</Grid>
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
