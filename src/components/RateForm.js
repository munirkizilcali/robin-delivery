import React from "react";
import { Label, Grid, Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { submitRating } from "../redux/actions/order";

class RateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverRating: 0,
      restaurantRating: 0
    };
  }

  handleDriverRatingChange = e => {
    let rating = parseInt(e.target.attributes["aria-posinset"].value, 10);
    this.setState(() => {
      return {
        driverRating: rating
      };
    });
    if (this.state.restaurantRating !== 0) {
      // debugger;
      debounce(this.handleRating, 0).bind(this)();
    }
  };

  handleRestaurantRatingChange = e => {
    let rating = parseInt(e.target.attributes["aria-posinset"].value, 10);
    this.setState(() => {
      return {
        restaurantRating: rating
      };
    });
    if (this.state.driverRating !== 0) {
      // debugger;
      debounce(this.handleRating, 0).bind(this)();
    }
  };

  handleRating = () => {
    // debugger;
    if (this.state.driverRating !== 0 && this.state.restaurantRating !== 0) {
      this.props.submitRating(
        this.props.order.id,
        this.state.restaurantRating,
        this.state.driverRating
      );
    }
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
  return {
    submitRating: (orderId, restaurantRating, driverRating) =>
      dispatch(submitRating(orderId, restaurantRating, driverRating))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateForm);
