import React from "react";
import { Icon, Rating, Card, List } from "semantic-ui-react";
import moment from "moment";

import TipForm from "./TipForm";
import RateForm from "./RateForm";

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      status: "",
      description: "",
      iconColor: "",
      cardBgColor: ""
    };
  }

  componentDidMount() {
    let iconColor = "";
    let cardBgColor = "";
    if (this.props.order) {
      switch (this.props.order.status) {
        case "new":
          this.setState({
            icon: "hand point up",
            iconColor: "yellow",
            status: "Order Received",
            description: "Assigning a driver to your order",
            cardBgColor: "#ffffea"
          });
          break;
        case "courierSet":
          this.setState({
            icon: "hotjar",
            iconColor: "red",
            status: "Preparing",
            description: "Driver assigned. Your meal is getting ready.",
            cardBgColor: "#ffe1e0"
          });
          break;
        case "pickedUp":
          this.setState({
            icon: "motorcycle",
            iconColor: "blue",
            status: "Picked up",
            description:
              "Your order has been picked up. Your meal is on the way.",
            cardBgColor: "#e1e0ff"
          });
          break;
        case "completed":
          if (!this.props.order.review || !this.props.order.tip_amount) {
            iconColor = "green";
            cardBgColor = "#e8ffe9";
          } else {
            iconColor = "black";
            cardBgColor = "#ededed";
          }

          this.setState({
            icon: "check",
            status: "Delivered",
            description: "Enjoy your meal.",
            cardBgColor: cardBgColor,
            iconColor: iconColor
          });
          break;
      }
    }
  }

  static getDerivedStateFromProps(props) {
    let iconColor = "";
    let cardBgColor = "";
    if (props.order) {
      switch (props.order.status) {
        case "new":
          return {
            icon: "hand point up",
            iconColor: "yellow",
            status: "Order Received",
            description: "Assigning a driver to your order",
            cardBgColor: "#ffffea"
          };

        case "courierSet":
          return {
            icon: "hotjar",
            iconColor: "red",
            status: "Preparing",
            description: "Driver assigned. Your meal is getting ready.",
            cardBgColor: "#ffe1e0"
          };

        case "pickedUp":
          return {
            icon: "motorcycle",
            iconColor: "blue",
            status: "Picked up",
            description:
              "Your order has been picked up. Your meal is on the way.",
            cardBgColor: "#e1e0ff"
          };

        case "completed":
          if (!props.order.review || !props.order.tip_amount) {
            iconColor = "green";
            cardBgColor = "#e8ffe9";
          } else {
            iconColor = "black";
            cardBgColor = "#ededed";
          }

          return {
            icon: "check",
            status: "Delivered",
            description: "Enjoy your meal.",
            cardBgColor: cardBgColor,
            iconColor: iconColor
          };
      }
    }
  }

  render() {
    return this.props.order ? (
      <Card raised color={this.state.iconColor} style={{ width: "350px" }}>
        <Card.Content style={{ backgroundColor: this.state.cardBgColor }}>
          <Card.Header>
            <Icon name={this.state.icon} color={this.state.iconColor} />
            {this.props.order.restaurant.name} - ${this.props.order.price}{" "}
            {this.props.order.review ? (
              <span>
                <Rating icon="star" maxRating={1} defaultRating={1} disabled />
                {this.props.order.review.restaurant_rating}
              </span>
            ) : (
              ""
            )}
          </Card.Header>
          <Card.Meta>
            {this.state.status} -{" "}
            {moment(this.props.order.order_time).format("llll")}
          </Card.Meta>
          {this.props.order.courier ? (
            <Card.Meta>
              Driver: {this.props.order.courier.first_name}{" "}
              {this.props.order.review ? (
                <span>
                  <Rating
                    icon="star"
                    maxRating={1}
                    defaultRating={1}
                    disabled
                  />
                  {this.props.order.review.delivery_rating}
                </span>
              ) : (
                ""
              )}
            </Card.Meta>
          ) : (
            ""
          )}
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <List>
              <List.Header>
                <strong>
                  Cnt - Ordered Items{" "}
                  <List.Content floated="right">Price</List.Content>
                </strong>
              </List.Header>
              {this.props.order.meals.map(meal => (
                <List.Item key={meal.menu_item.id}>
                  <span style={{ paddingRight: "1em" }}>#{meal.number} </span>{" "}
                  {meal.menu_item.name.slice(0, 38)}
                  {meal.menu_item.name.slice(0, 38).length === 38 ? "..." : ""}
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
                    ${(
                      parseFloat(this.props.order.price) +
                      (this.props.order.tip_amount
                        ? parseFloat(this.props.order.tip_amount)
                        : 0)
                    ).toFixed(2)}
                  </List.Content>
                </strong>
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        {this.state.iconColor === "green" ? (
          <Card.Content extra>
            {!this.props.order.tip_amount ? (
              <TipForm order={this.props.order} />
            ) : (
              ""
            )}
            {!this.props.order.review ? (
              <RateForm order={this.props.order} />
            ) : (
              ""
            )}
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
