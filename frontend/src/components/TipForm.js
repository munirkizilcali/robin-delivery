import React from "react";
import { Form, Button, Icon, Label, Grid, Rating } from "semantic-ui-react";
import { connect } from "react-redux";

import { unsetItemInfo } from "../redux/actions/menuItem";

const TipForm = props => {
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
          >
            <Button icon color="orange">
              <small>%12</small>
            </Button>
            <Label basic as="a" pointing="left" color="orange">
              ${(props.order.price * 0.12).toFixed(2)}
            </Label>
          </Button>
          <Button
            as="div"
            labelPosition="right"
            style={{ "margin-right": "7px" }}
          >
            <Button icon color="yellow">
              <small>%15</small>
            </Button>
            <Label as="a" basic pointing="left" color="yellow">
              ${(props.order.price * 0.15).toFixed(2)}
            </Label>
          </Button>{" "}
          <Button as="div" labelPosition="right">
            <Button icon color="olive">
              <small>%18</small>
            </Button>
            <Label as="a" basic pointing="left" color="olive">
              ${(props.order.price * 0.18).toFixed(2)}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipForm);
