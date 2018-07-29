import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";
import RestaurantDetails from "./RestaurantDetails";
import RecentOrders from "./RecentOrders";
import OrderDetails from "./OrderDetails";

class HomeContainer extends React.Component {
	state = {
		visible: false
	};
	componentDidMount() {}

	render() {
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<Navbar />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ height: "100%" }}>
						<Grid.Column>
							<Grid stackable>
								<Grid.Column width={5}>
									<SearchResults />
								</Grid.Column>
								<Grid.Column width={10}>
									{this.props.restaurantSelectedBool ? (
										<RestaurantDetails />
									) : (
										""
									)}
								</Grid.Column>
								<Grid.Column width={1}>
									<Grid.Row>
										<RecentOrders />
									</Grid.Row>
								</Grid.Column>
							</Grid>
						</Grid.Column>
					</Grid.Row>
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
