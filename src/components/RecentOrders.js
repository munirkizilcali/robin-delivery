import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Icon, Step, List, Rating, Card } from "semantic-ui-react";
import { orderBy } from "lodash";
import OrderDetails from "./OrderDetails";

class RecentOrders extends React.Component {
	descriptionRenderer(order) {
		switch (order.status) {
			case "new":
				return (
					<List.Item key={order.id} as="a">
						<List.Icon
							name="hand point up"
							verticalAlign="middle"
							size="large"
						/>
						<List.Content>
							<List.Header>
								{order.restaurant.name} - ${order.price} -{" "}
								{moment(order.order_time).fromNow()}
							</List.Header>

							<List.Description>
								Order Received -{" "}
								<small>Searching for a driver...</small>
							</List.Description>
						</List.Content>
					</List.Item>
				);
			case "courierSet":
				return (
					<List.Item key={order.id} as="a">
						<List.Icon
							name="hotjar"
							verticalAlign="middle"
							size="large"
						/>
						<List.Content>
							<List.Header>
								{order.restaurant.name} - ${order.price} -{" "}
								{moment(order.order_time).fromNow()}
							</List.Header>

							<List.Description>
								Preparing -{" "}
								<small>
									Driver set. Your meal is getting ready.
								</small>
							</List.Description>
						</List.Content>
					</List.Item>
				);
			case "pickedUp":
				return (
					<List.Item key={order.id} as="a">
						<List.Icon
							name="motorcycle"
							verticalAlign="middle"
							size="large"
						/>
						<List.Content>
							<List.Header>
								{order.restaurant.name} - ${order.price} -{" "}
								{moment(order.order_time).fromNow()}
							</List.Header>

							<List.Description>
								Picked up -{" "}
								<small>Your order is on the way</small>
							</List.Description>
						</List.Content>
					</List.Item>
				);
			case "completed":
				return (
					<List.Item key={order.id} as="a">
						<List.Icon
							name="check"
							verticalAlign="middle"
							size="large"
						/>
						<List.Content>
							<List.Header>
								{order.restaurant.name} - ${order.price} -{" "}
								{moment(order.order_time).fromNow()}
							</List.Header>

							<List.Description>
								Completed -{" "}
								<small>
									Please rate:
									<Rating maxRating={5} />
								</small>
							</List.Description>
						</List.Content>
					</List.Item>
				);
		}
	}

	render() {
		return (
			<Card.Group itemsPerRow={2}>
				{orderBy(this.props.recentOrders, "order_time", "desc").map(
					order => {
						return <OrderDetails order={order} />;
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
