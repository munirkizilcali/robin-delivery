import React from "react";
import { connect } from "react-redux";
import { Card, Header } from "semantic-ui-react";
import { orderBy } from "lodash";
import OrderDetails from "./OrderDetails";

class RecentOrders extends React.Component {
	render() {
		if (this.props.userType !== "customer") {
			return (
				<Header as="h2">
					You are not authorized for this page. Please log out and log
					in back as a customer.
				</Header>
			);
		} else {
			return (
				<Card.Group itemsPerRow={2}>
					{orderBy(this.props.recentOrders, "order_time", "desc").map(
						order => {
							return (
								<OrderDetails order={order} key={order.id} />
							);
						}
					)}
				</Card.Group>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		recentOrders: state.recentOrders,
		userType: state.user.user_type
	};
};

export default connect(mapStateToProps)(RecentOrders);
