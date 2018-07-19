import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import HomeContainer from "./HomeContainer";
import { fetchUserData } from "../redux/actions/user";

class PageContainer extends React.Component {
	componentDidMount() {
		this.props.fetchUserData();
	}

	render() {
		return (
			<div>
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
		fetchUserData: () => dispatch(fetchUserData())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageContainer);
