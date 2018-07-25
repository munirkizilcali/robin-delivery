import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import {
  setSearchTerm,
  nearbyRestaurants
} from "../redux/actions/searchResults";

const ItemDetails = props => {
  let debouncedSearch = debounce((a, b, c) => {
    props.nearbyRestaurants(a, b, c);
    props.setSearchTerm(c);
  }, 500);

  const handleSearchInput = (e, d) => {
    debouncedSearch(props.location, props.range, d.value);
  };

  return (
    <Menu.Item>
      <Input
        icon="search"
        placeholder="Search for a restaurant"
        onChange={handleSearchInput}
      />
    </Menu.Item>
  );
};

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
