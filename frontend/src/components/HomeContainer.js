import React from "react";

import Navbar from "./Navbar";
import SearchResults from "./SearchResults";
import Gmap from "./Gmap";
import Logout from "./Logout";
import {Grid, Transition} from 'semantic-ui-react'


class HomeContainer extends React.Component {
	state = {
		visible: false
	}
	componentDidMount() {
		setTimeout(this.setState({visible: true}), 2000)
	}

	render() {
		return (
			<div>
					<Navbar />
				<Grid stackable>
				<Grid.Column width={8}>
				<SearchResults /></Grid.Column>
				<Grid.Column width={8}><Gmap /></Grid.Column>
				</Grid>
	
			</div>
		);
	}
}

export default HomeContainer;
