import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import HomeContainer from "./HomeContainer";
import { fetchUserData } from "../redux/actions/user";
import { fetchRecentOrders } from "../redux/actions/recentOrders";

class PageContainer extends React.Component {
	componentDidMount() {
		this.props.fetchUserData().then(() => this.props.fetchRecentOrders());
	}

	render() {
		let ht = `${window.innerHeight}px`;
		return (
			<div
				style={{
					height: ht,
					overflowY: "auto"
				}}
			>
				{!!localStorage.token && this.props.loggedIn ? (
					<HomeContainer />
				) : (
					<Login />
				)}
			</div>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageContainer);
