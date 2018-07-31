import React from "react";
import { Button, Label, Grid, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { updateOrderStatus } from "../redux/actions/order";

const ProceedDeliveryForm = props => {
  const handleClick = (orderId, status) => {};

  return (
    <Grid>
      <Grid.Row centered>
        {props.order.status === "courierSet" ? (
          <Button
            color="yellow"
            onClick={() => props.updateOrderStatus(props.order.id, "pickedUp")}
          >
            <Icon name="arrow down cart" /> Mark as the order has been picked up
          </Button>
        ) : props.order.status === "pickedUp" ? (
          <Button
            color="green"
            onClick={() => props.updateOrderStatus(props.order.id, "completed")}
          >
            <Icon name="flag checkered" /> Mark the order delivered to the
            customer
          </Button>
        ) : props.order.status === "new" ? (
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={() =>
                props.updateOrderStatus(props.order.id, "courierSet")
              }
            >
              Accept
            </Button>
            <Button
              basic
              color="red"
              onClick={() => props.updateOrderStatus(props.order.id, "reject")}
            >
              Decline
            </Button>
          </div>
        ) : (
          ""
        )}
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    updateOrderStatus: (orderId, tipAmount) =>
      dispatch(updateOrderStatus(orderId, tipAmount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProceedDeliveryForm);
