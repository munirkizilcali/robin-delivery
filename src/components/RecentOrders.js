import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Icon, Step, List, Rating, Card } from "semantic-ui-react";
import { orderBy } from "lodash";
import OrderDetails from "./OrderDetails";

class RecentOrders extends React.Component {
	render() {
		return (
			<Card.Group itemsPerRow={2}>
				{orderBy(this.props.recentOrders, "order_time", "desc").map(
					order => {
						return <OrderDetails order={order} key={order.id} />;
					}
				)}
			</Card.Group>
		);
	}
}

const mapStateToProps = state => {
	return {
		recentOrders: state.recentOrders
	};
};

export default connect(mapStateToProps)(RecentOrders);
