import React from "react";
import { Button, Label, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import { submitTip } from "../redux/actions/order";

const TipForm = props => {
  const handleClick = (orderId, tipAmount) => {
    props.submitTip(orderId, tipAmount);
  };

  return (
    <Grid>
      <Grid.Row centered>
        <Label pointing="below">Select a tip amount (be generous!)</Label>
        <br />
        <Button.Group>
          <Button
            as="div"
            labelPosition="right"
            style={{ "margin-right": "7px" }}
            onClick={() =>
              handleClick(props.order.id, (props.order.price * 0.18).toFixed(2))
            }
          >
            <Button icon color="orange">
              <small>%18</small>
            </Button>
            <Label basic as="a" pointing="left" color="orange">
              ${(props.order.price * 0.18).toFixed(2)}
            </Label>
          </Button>
          <Button
            as="div"
            labelPosition="right"
            style={{ "margin-right": "7px" }}
            onClick={() =>
              handleClick(props.order.id, (props.order.price * 0.2).toFixed(2))
            }
          >
            <Button icon color="yellow">
              <small>%20</small>
            </Button>
            <Label as="a" basic pointing="left" color="yellow">
              ${(props.order.price * 0.2).toFixed(2)}
            </Label>
          </Button>{" "}
          <Button
            as="div"
            labelPosition="right"
            onClick={() =>
              handleClick(props.order.id, (props.order.price * 0.25).toFixed(2))
            }
          >
            <Button icon color="olive">
              <small>%25</small>
            </Button>
            <Label as="a" basic pointing="left" color="olive">
              ${(props.order.price * 0.25).toFixed(2)}
            </Label>
          </Button>
        </Button.Group>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    submitTip: (orderId, tipAmount) => dispatch(submitTip(orderId, tipAmount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipForm);
