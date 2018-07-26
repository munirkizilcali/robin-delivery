import React from "react";
import { Form, Button, Icon, Label, Grid, Rating } from "semantic-ui-react";
import { connect } from "react-redux";

import { unsetItemInfo } from "../redux/actions/menuItem";

class RateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverRating: 0,
      restaurantRating: 0
    };
  }
  handleDriverRatingChange = e => {
    this.setState({
      driverRating: parseInt(e.target.attributes["aria-posinset"].value)
    });
  };

  handleRestaurantRatingChange = e => {
    this.setState({
      restaurantRating: parseInt(e.target.attributes["aria-posinset"].value)
    });
  };
  render() {
    return (
      <Grid>
        <Grid.Row columns={2} centered>
          <Grid.Column fluid centered>
            <center>
              <Label pointing="below">Driver:</Label>
              <br />
              <Rating
                icon="star"
                maxRating={5}
                onClick={this.handleDriverRatingChange}
                name="driver"
                disabled={!!this.state.driverRating}
              />
            </center>
          </Grid.Column>
          <Grid.Column fluid centered>
            <center>
              <Label pointing="below">Restaurant:</Label>
              <br />
              <Rating
                icon="star"
                maxRating={5}
                onClick={this.handleRestaurantRatingChange}
                disabled={!!this.state.restaurantRating}
              />
            </center>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateForm);
