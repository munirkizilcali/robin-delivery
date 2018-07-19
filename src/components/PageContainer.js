import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import HomeContainer from "./HomeContainer";
import { fetchUserData } from "../redux/actions/user";
import { checkTokenValidity } from "../redux/actions/login";

class PageContainer extends React.Component {
	componentDidMount() {
		debugger;
		if (!!localStorage.token) {
			this.props
				.checkTokenValidity()
				.then(() => this.props.fetchUserData());
		}
	}
	componentDidUpdate() {
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
		fetchUserData: () => dispatch(fetchUserData()),
		checkTokenValidity: () => dispatch(checkTokenValidity())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PageContainer);
