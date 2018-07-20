import React from "react";
import { Button, Form, Input, Grid, Image } from "semantic-ui-react";
import { connect } from "react-redux";

import { login } from "../redux/actions/login";
import logoFull from "../assets/logo_full.png";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.login(this.state.email, this.state.password);
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<Grid padded verticalAlign="middle" centered>
				<Grid.Row>
					<Grid.Column mobile={13} tablet={6} computer={4}>
						<Image src={logoFull} size="small" centered />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column mobile={13} tablet={6} computer={4}>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<Input
									name="email"
									id="email"
									type="email"
									placeholder="Email"
									onChange={this.handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<Input
									name="password"
									id="password"
									type="password"
									placeholder="Password"
									onChange={this.handleChange}
								/>
							</Form.Field>
							<Form.Field>
								<Button type="submit">Login</Button>
							</Form.Field>
						</Form>
						{this.props.isLoginPending ? (
							<div>Please wait...</div>
						) : (
							""
						)}
						{this.props.isLoginSuccess && <div>Success.</div>}
						{this.props.loginError && (
							<div>{this.props.loginError.message}</div>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoginPending: state.login.isLoginPending,
		isLoginSuccess: state.login.isLoginSuccess,
		loginError: state.login.loginError
	};
};

const mapDispatchToProps = dispatch => {
	return { login: (email, password) => dispatch(login(email, password)) };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
