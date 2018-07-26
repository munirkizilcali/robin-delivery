import React from "react";
import { Button, Header, Icon, Rating, Card, List } from "semantic-ui-react";
import moment from "moment";

import { unsetItemInfo } from "../redux/actions/menuItem";
import TipForm from "./TipForm";
import RateForm from "./RateForm";

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      status: "",
      description: "",
      iconColor: ""
    };
  }
  componentDidMount() {
    let iconColor = "";
    if (this.props.order) {
      switch (this.props.order.status) {
        case "new":
          this.setState({
            icon: "hand point up",
            iconColor: "yellow",
            status: "Order Received",
            description: "Assigning a driver to your order"
          });
          break;
        case "courierSet":
          this.setState({
            icon: "hotjar",
            iconColor: "red",
            status: "Preparing",
            description: "Driver assigned. Your meal is getting ready."
          });
          break;
        case "pickedUp":
          this.setState({
            icon: "motorcycle",
            iconColor: "blue",
            status: "Picked up",
            description:
              "Your order has been picked up. Your meal is on the way."
          });
          break;
        case "completed":
          !this.props.order.review || this.props.order.tip_amount
            ? (iconColor = "black")
            : (iconColor = "green"),
            this.setState({
              icon: "check",
              status: "Delivered",
              description: "Enjoy your meal.",
              iconColor: iconColor
            });
          break;
      }
    }
  }

  render() {
    return this.props.order ? (
      <Card color={this.state.iconColor} style={{ minWidth: "350px" }}>
        <Card.Content>
          <Card.Header>
            <Icon name={this.state.icon} color={this.state.iconColor} />
            {this.props.order.restaurant.name} - ${this.props.order.price}
          </Card.Header>
          <Card.Meta>
            {this.state.status} -{" "}
            {moment(this.props.order.order_time).format("llll")}
          </Card.Meta>
          <Card.Description>
            <List>
              <List.Header>
                <strong>
                  Cnt - Ordered Items{" "}
                  <List.Content floated="right">Price</List.Content>
                </strong>
              </List.Header>
              {this.props.order.meals.map(meal => (
                <List.Item>
                  <span style={{ "padding-right": "1em" }}>
                    #{meal.number}{" "}
                  </span>{" "}
                  {meal.menu_item.name}{" "}
                  <List.Content floated="right">
                    ${meal.price * meal.number}
                  </List.Content>
                </List.Item>
              ))}
              {this.props.order.tip_amount ? (
                <List.Item>
                  <strong>
                    Tip
                    <List.Content floated="right">
                      ${this.props.order.tip_amount
                        ? this.props.order.tip_amount
                        : 0}
                    </List.Content>
                  </strong>
                </List.Item>
              ) : (
                ""
              )}
              <List.Item>
                <strong>
                  Total
                  <List.Content floated="right">
                    ${this.props.order.price +
                      (this.props.order.tip_amount
                        ? this.props.order.tip_amount
                        : 0)}
                  </List.Content>
                </strong>
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        {this.state.iconColor === "black" ? (
          <Card.Content extra>
            {!this.state.tip_amount ? <TipForm order={this.props.order} /> : ""}
            {!this.state.review ? <RateForm order={this.props.order} /> : ""}
          </Card.Content>
        ) : (
          ""
        )}
      </Card>
    ) : (
      ""
    );
  }
}

export default OrderDetails;
