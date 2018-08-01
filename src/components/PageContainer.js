import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import Login from "./Login";
import SearchResults from "./SearchResults";
import RestaurantDetails from "./RestaurantDetails";
import RecentOrders from "./RecentOrders";
import DeliveryContainer from "./DeliveryContainer";
import Navbar from "./Navbar";
import NavbarDriver from "./NavbarDriver";
import { fetchUserData } from "../redux/actions/user";
import { fetchRecentOrders } from "../redux/actions/recentOrders";
import { setPosition } from "../redux/actions/location";
import { history } from "../redux/history";

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props
			.setPosition()
			.then(() => this.props.fetchUserData())
			.then(() => this.props.fetchRecentOrders());
	}

	render() {
		// debugger;
		return (
			<Grid container columns={1}>
				{this.props.loggedIn && !!localStorage.token ? (
					<Grid.Row>
						<Grid.Column width={13} mobile={16}>
							<center>
								{this.props.userType === "customer" ? (
									<Route path="/" component={Navbar} />
								) : (
									<Route path="/" component={NavbarDriver} />
								)}
							</center>
						</Grid.Column>
					</Grid.Row>
				) : (
					""
				)}
				<Grid.Row>
					<Grid.Column>
						<Grid stackable centered>
							<Grid.Column width={13} mobile={16}>
								<div style={{ marginTop: "50px" }}>
									<Switch>
										<PrivateRoute
											authed={
												this.props.loggedIn &&
												!!localStorage.token
											}
											exact
											path="/restaurants"
											component={SearchResults}
										/>
										<PrivateRoute
											authed={
												this.props.loggedIn &&
												!!localStorage.token
											}
											path="/restaurants/:id"
											component={RestaurantDetails}
										/>
										<PrivateRoute
											authed={
												this.props.loggedIn &&
												!!localStorage.token
											}
											path="/recentorders"
											component={RecentOrders}
										/>
										<Route
											path="/login"
											component={Login}
										/>
										<PrivateRoute
											authed={
												this.props.loggedIn &&
												!!localStorage.token
											}
											path="/recentdeliveries"
											component={DeliveryContainer}
										/>
										<DefaultRoute
											userType={this.props.userType}
										/>
									</Switch>
								</div>
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const DefaultRoute = props => {
	// debugger;
	if (props.userType === "customer") {
		return <Redirect to="/restaurants" />;
	} else if (props.userType === "courier") {
		return <Redirect to="/recentdeliveries" />;
	}
};

const mapStateToProps = state => {
	return {
		loggedIn: state.login.isLoginSuccess,
		userType: state.user.user_type
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUserData: () => dispatch(fetchUserData()),
		fetchRecentOrders: () => dispatch(fetchRecentOrders()),
		setPosition: () => dispatch(setPosition())
	};
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				authed === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageContainer)
);
