import React from "react";
import { connect } from "react-redux";
import { Card, Header, Statistic, Icon, Container } from "semantic-ui-react";
import { orderBy } from "lodash";
import DeliveryDetails from "./DeliveryDetails";

class DeliveryContainer extends React.Component {
	render() {
		if (this.props.userType !== "courier") {
			return (
				<Header as="h2">
					You are not authorized for this page. Please log out and log
					in back as a driver.
				</Header>
			);
		} else {
			return (
				<div>
					<center>
						<Statistic size="small">
							<Statistic.Value>
								${this.props.totalTip}
							</Statistic.Value>
							<Statistic.Label>
								Total amount of tips
							</Statistic.Label>
						</Statistic>
						<Statistic size="small">
							<Statistic.Value>
								{this.props.recentOrders.length}
							</Statistic.Value>
							<Statistic.Label>
								Number of Deliveries
							</Statistic.Label>
						</Statistic>
					</center>
					<Card.Group itemsPerRow={2}>
						{orderBy(
							this.props.recentOrders,
							"order_time",
							"desc"
						).map(order => {
							return (
								<DeliveryDetails order={order} key={order.id} />
							);
						})}
					</Card.Group>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		recentOrders: state.recentOrders,
		userType: state.user.user_type,
		totalTip: state.user.total_tips
	};
};

export default connect(mapStateToProps)(DeliveryContainer);
