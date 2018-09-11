import React from "react";
import { Menu, Image, Icon, Grid, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import logoSquare from "../assets/logo_square.png";
import logoTitle from "../assets/logo_title.png";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import Logout from "./Logout";
import CartSummary from "./CartSummary";
import { nearbyRestaurants } from "../redux/actions/searchResults";
import SearchBar from "./SearchBar";
import RangeSlider from "./RangeSlider";
import { fetchRecentOrders } from "../redux/actions/recentOrders";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hide: true
		};
		this.recentOrdersLookup = null;
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleHideClick = e => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ hide: !this.state.hide });
	};

	handleRefresh = e => {
		this.props.fetchRecentOrders();
	};

	componentDidMount = () => {
		this.recentOrdersLookup = setInterval(() => {
			this.handleRefresh();
		}, 1000);
	};

	componentWillUnmount = () => {
		clearInterval(this.recentOrdersLookup);
	};

	debouncedHideClick = debounce(this.handleHideClick);

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
								handleHideClick={this.debouncedHideClick}
							/>
							<Menu.Item
								onClick={() =>
									this.setState({ hide: !this.state.hide })
								}
							>
								<Link
									to="/recentorders"
									onClick={this.handleRefresh}
								>
									<Icon name="history" size="large" />
									Recent Orders
								</Link>
							</Menu.Item>
							<Menu.Menu position="right">
								{
									<CartSummary
										handleHideClick={
											this.debouncedHideClick
										}
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
							<Link to="/restaurants">
								<Image src={logoSquare} size="mini" />
							</Link>
						</Menu.Item>

						<RangeSlider />
						<Menu.Item
							name="recentOrders"
							active={activeItem === "recentOrders"}
							onClick={this.handleItemClick}
						>
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
			dispatch(nearbyRestaurants(location, range, searchTerm)),
		fetchRecentOrders: () => dispatch(fetchRecentOrders())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
