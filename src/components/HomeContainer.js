import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";

import RestaurantDetails from "./RestaurantDetails";

class HomeContainer extends React.Component {
	state = {
		visible: false
	};
	componentDidMount() {}

	render() {
		return (
			<div>
				<Navbar />
				<Grid stackable>
					<Grid.Column width={8}>
						<SearchResults />
					</Grid.Column>
					<Grid.Column width={8}>
						{this.props.restaurantSelectedBool ? (
							<RestaurantDetails />
						) : (
							""
						)}
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		restaurantSelectedBool: !!state.selectedRestaurant.id
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeContainer);
