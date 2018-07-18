import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import HomeContainer from "./HomeContainer";

class PageContainer extends React.Component {
	render() {
		return (
			<div>
				PageContainer
				<Login />
				<HomeContainer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.login.token,
		loggedIn: state.login.isLoginSuccess,
		user: state.user
	};
	// return {};
};

export default connect(mapStateToProps)(PageContainer);
