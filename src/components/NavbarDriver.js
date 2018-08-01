import React from "react";
import { Menu, Image, Icon, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import logoSquare from "../assets/logo_square.png";
import logoTitle from "../assets/logo_title.png";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import Logout from "./Logout";
import { fetchRecentOrders } from '../redux/actions/recentOrders'

class NavbarDriver extends React.Component {
	state = {
		hide: true
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleHideClick = e => {
		if (e) {
			e.preventDefault();
		}
		this.setState({ hide: !this.state.hide });
	};

	debouncedHideClick = debounce(this.handleHideClick);

	handleRefresh = e => {
		this.props.fetchRecentOrders();
	}

	render() {
		const { activeItem } = this.state;

		return (
			<Grid
				style={{
					position: "fixed",
					zIndex: "100",
					width: "90%",
					left: "50%",
					transform: "translateX(-50%)"
				}}
			>
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
							<Menu.Item
								onClick={() =>
									this.setState({ hide: !this.state.hide })
								}
							>
								<Link to="/recentdeliveries">
									<Icon name="history" size="large"  onClick={this.handleRefresh} />
									Recent Deliveries
								</Link>
							</Menu.Item>
							<Menu.Menu position="right">
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
					<Grid.Column>
						<Menu>
							<Menu.Item
								name="logo"
								active={activeItem === "logo"}
								onClick={this.handleItemClick}
							>
								<Image src={logoSquare} size="mini" />
							</Menu.Item>

							<Menu.Item>
								<Link to="/recentdeliveries">
									<Icon name="history" size="large" />
									Recent Deliveries
								</Link>
							</Menu.Item>
							<Menu.Menu position="right">
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
					</Grid.Column>
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
		fetchRecentOrders: () => dispatch(fetchRecentOrders())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarDriver);
