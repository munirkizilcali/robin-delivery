import React from "react";
import { Icon, Rating, Card, List, Image } from "semantic-ui-react";
import moment from "moment";

import ProceedDeliveryForm from "./ProceedDeliveryForm";

class DeliveryDetails extends React.Component {
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
    let status = "";
    let description = "";
    if (this.props.order) {
      switch (this.props.order.status) {
        case "new":
          this.setState({
            icon: "hand point up",
            iconColor: "yellow",
            status: "Please accept or reject",
            description:
              "If you reject, the order will be sent to another driver.",
            cardBgColor: "#ffffea"
          });
          break;
        case "courierSet":
          this.setState({
            icon: "hotjar",
            iconColor: "red",
            status: "Head to restaurant",
            description:
              "The meal is getting ready. Please head to the restaurant.",
            cardBgColor: "#ffe1e0"
          });
          break;
        case "pickedUp":
          this.setState({
            icon: "motorcycle",
            iconColor: "blue",
            status: "Make the delivery",
            description: "Please head to the customer address.",
            cardBgColor: "#e1e0ff"
          });
          break;
        case "completed":
          if (!this.props.order.review || !this.props.order.tip_amount) {
            iconColor = "green";
            cardBgColor = "#e8ffe9";
            status = "Delivered";
            description = "Waiting for the tip and review";
          } else {
            iconColor = "black";
            cardBgColor = "#ededed";
            status = "Completed";
            description = "Tipped and reviewed by the customer";
          }

          this.setState({
            icon: "check",
            status: status,
            description: description,
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
    let status = "";
    let description = "";
    if (props.order) {
      switch (props.order.status) {
        case "new":
          return {
            icon: "hand point up",
            iconColor: "yellow",
            status: "Please accept or reject",
            description: "If you reject order will be sent to another driver.",
            cardBgColor: "#ffffea"
          };

        case "courierSet":
          return {
            icon: "hotjar",
            iconColor: "red",
            status: "Head to restaurant",
            description:
              "The meal is getting ready. Please head to the restaurant.",
            cardBgColor: "#ffe1e0"
          };

        case "pickedUp":
          return {
            icon: "motorcycle",
            iconColor: "blue",
            status: "Make the delivery",
            description: "Please head to the customer address.",
            cardBgColor: "#e1e0ff"
          };

        case "completed":
          if (!props.order.review || !props.order.tip_amount) {
            iconColor = "green";
            cardBgColor = "#e8ffe9";
            status = "Delivered";
            description = "Waiting for the tip and be reviewed.";
          } else {
            iconColor = "black";
            cardBgColor = "#ededed";
            status = "Completed";
            description = "You are tipped and reviewed by the customer.";
          }

          return {
            icon: "check",
            status: status,
            description: description,
            cardBgColor: cardBgColor,
            iconColor: iconColor
          };
      }
    }
  }

  render() {
    return this.props.order ? (
      <Card raised color={this.state.iconColor} style={{ width: "350px" }}>
        {!(
          this.props.order.status === "new" ||
          this.props.order.map_url === "No_map" ||
          this.props.order.status === "completed"
        ) ? (
          <Image src={this.props.order.map_url} />
        ) : (
          ""
        )}
        <Card.Content style={{ backgroundColor: this.state.cardBgColor }}>
          <Card.Header>
            <Icon name={this.state.icon} color={this.state.iconColor} />
            {this.props.order.restaurant.name}
          </Card.Header>
          <br />
          <Card.Header>
            <Icon name="user" color="green" />
            Customer: {this.props.order.user.first_name}
          </Card.Header>
          <Card.Meta>
            <strong>{this.state.status}: </strong>
            {this.state.description}
            <br />
            <strong>Order Time:</strong>{" "}
            {moment(this.props.order.order_time).fromNow()}
          </Card.Meta>

          {this.props.order.review ? (
            <Card.Meta>
              <strong>Customer rated you:</strong>{" "}
              <Rating icon="star" maxRating={1} defaultRating={1} disabled />
              {this.props.order.review.delivery_rating}
            </Card.Meta>
          ) : (
            ""
          )}

          {this.props.order.tip_amount ? (
            <Card.Meta>
              <strong>Customer tipped you:</strong> $
              {this.props.order.tip_amount}
            </Card.Meta>
          ) : (
            ""
          )}
        </Card.Content>
        <Card.Content>
          <Icon name="food" />
          <strong>Restaurant Address:</strong>
          {this.props.order.restaurant.address}
          <br />
          <Icon name="flag checkered" />
          <strong>Customer Address:</strong>
          {this.props.order.order_address}
        </Card.Content>
        <Card.Content extra>
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
        {this.state.iconColor !== "green" ? (
          <Card.Content extra>
            <ProceedDeliveryForm order={this.props.order} />
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

export default DeliveryDetails;
