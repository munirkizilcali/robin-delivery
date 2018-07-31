import React from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { orderBy } from "lodash";
import DeliveryDetails from "./DeliveryDetails";

class DeliveryContainer extends React.Component {
	render() {
		return (
			<Card.Group itemsPerRow={2}>
				{orderBy(this.props.recentOrders, "order_time", "desc").map(
					order => {
						return <DeliveryDetails order={order} key={order.id} />;
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

export default connect(mapStateToProps)(DeliveryContainer);
