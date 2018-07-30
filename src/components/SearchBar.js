import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { history } from "../redux/history";
import {
  setSearchTerm,
  nearbyRestaurants
} from "../redux/actions/searchResults";

class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
    this.debouncedSearch = debounce((a, b, c) => {
      props.nearbyRestaurants(a, b, c);
      props.setSearchTerm(c);
    }, 500);
  }

  handleSearchInput = (e, d) => {
    this.debouncedSearch(this.props.location, this.props.range, d.value);
  };

  render() {
    return (
      <Menu.Item>
        <Input
          icon="search"
          placeholder="Search for a restaurant"
          onFocus={() => history.push("/restaurants")}
          onChange={this.handleSearchInput}
        />
      </Menu.Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm,
    range: state.location.range,
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: input => dispatch(setSearchTerm(input)),
    nearbyRestaurants: (location, range, searchTerm) =>
      dispatch(nearbyRestaurants(location, range, searchTerm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
