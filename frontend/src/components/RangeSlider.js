import React from "react";
import { Menu, Icon, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import { setRange } from "../redux/actions/location";
import { nearbyRestaurants } from "../redux/actions/searchResults";

class RangeSlider extends React.Component {
	state = {};

	handleRangeChange = e => {
		this.props.setRange(parseFloat(e.target.value));
		this.props.nearbyRestaurants(
			this.props.location,
			parseFloat(e.target.value),
			this.props.searchTerm
		);
	};

	render() {
		const { activeItem } = this.state;

		return (
			<Menu.Item>
				<Icon name="location arrow" size="large" />Nearby Restaurants
				(Range: {this.props.range.toFixed(1)} miles)
				<Input
					min={0.5}
					max={5}
					onChange={this.handleRangeChange}
					type="range"
					value={this.props.range}
					step={0.5}
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
