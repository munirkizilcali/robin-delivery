import React from "react";
import { Grid } from "semantic-ui-react";

import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";

import RestaurantDetails from "./RestaurantDetails";

class HomeContainer extends React.Component {
	state = {
		visible: false
	};
	componentDidMount() {
		setTimeout(this.setState({ visible: true }), 2000);
	}

	render() {
		return (
			<div>
				<Navbar />
				<Grid stackable>
					<Grid.Column width={8}>
						<SearchResults />
					</Grid.Column>
					<Grid.Column width={8}>
						<RestaurantDetails id={2} />
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default HomeContainer;
