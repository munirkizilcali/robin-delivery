import React from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import { Grid, Sticky } from "semantic-ui-react";

import Login from "./Login";
import SearchResults from "./SearchResults";
import RestaurantDetails from "./RestaurantDetails";
import RecentOrders from "./RecentOrders";
import Navbar from "./Navbar";
import { fetchUserData } from "../redux/actions/user";
import { fetchRecentOrders } from "../redux/actions/recentOrders";

class PageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.fetchUserData().then(() => this.props.fetchRecentOrders());
	}

	handleContextRef = contextRef => this.setState({ contextRef });

	render() {
		const { contextRef } = this.state;
		return (
			<Grid container columns={1}>
				<Grid.Row>
					<Grid.Column>
						<Sticky context={contextRef}>
							<Route path="/" component={Navbar} />
						</Sticky>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Grid stackable centered>
							<Grid.Column
								width={13}
								mobile={16}
								centered
								ref={this.handleContextRef}
							>
								<Switch>
									<Route
										exact
										path="/restaurants"
										component={SearchResults}
									/>
									<Route
										path="/restaurants/:id"
										component={RestaurantDetails}
									/>
									<Route
										path="/recentorders"
										component={RecentOrders}
									/>
								</Switch>
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.login.isLoginSuccess
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUserData: () => dispatch(fetchUserData()),
		fetchRecentOrders: () => dispatch(fetchRecentOrders())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageContainer)
);
