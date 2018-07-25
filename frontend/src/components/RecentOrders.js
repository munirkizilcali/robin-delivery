import React from "react";
import { connect } from "react-redux";
import moment from "moment";

class RecentOrders extends React.Component {
	render() {
		return (
			<div>
				<h1>recent orders</h1>
				{this.props.recentOrders.map(order => {
					return (
						<p>
							{order.restaurant.name} - {order.price} -{" "}
							{moment(order.order_time).fromNow()}
						</p>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		recentOrders: state.recentOrders
	};
};

export default connect(mapStateToProps)(RecentOrders);
