import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Slider } from "react-semantic-ui-range";

import { setRange } from "../redux/actions/location";
import { nearbyRestaurants } from "../redux/actions/searchResults";

class RangeSlider extends React.Component {
	state = {};

	handleRangeChange = value => {
		this.props.setRange(parseFloat(value));
		this.props.nearbyRestaurants(
			this.props.location,
			parseFloat(value),
			this.props.searchTerm
		);
	};

	render() {
		return (
			<Menu.Item>
				<Icon name="location arrow" size="large" color="blue" />
				<Link to="/restaurants">
					Nearby Restaurants <br />(Range:{" "}
					{this.props.range.toFixed(1)} miles)
				</Link>
				<Slider
					color="blue"
					inverted={false}
					settings={{
						start: this.props.range,
						min: 0,
						max: 5,
						step: 0.5,
						onChange: value => this.handleRangeChange(value)
					}}
					style={{ minWidth: "220px" }}
				/>
			</Menu.Item>
		);
	}
}

const mapStateToProps = state => {
	return {
		range: state.location.range,
		location: state.location,
		searchTerm: state.searchTerm
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setRange: range => dispatch(setRange(range)),
		nearbyRestaurants: (location, range, searchTerm) =>
			dispatch(nearbyRestaurants(location, range, searchTerm))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RangeSlider);
