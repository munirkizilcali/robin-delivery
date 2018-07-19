import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import { login, logout } from "../redux/actions/login";

class Logout extends React.Component {
	handleClick = e => {
		this.props.logout();
	};

	render() {
		return <span onClick={this.handleClick}>Log out</span>;
	}
}

const mapStateToProps = state => {
	return {
		isLoginSuccess: state.login.isLoginSuccess,
		loginError: state.login.loginError
	};
};

const mapDispatchToProps = dispatch => {
	return { logout: () => dispatch(logout()) };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout);
