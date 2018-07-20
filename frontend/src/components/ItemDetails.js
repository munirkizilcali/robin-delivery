import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { unsetItemInfo } from "../redux/actions/menuItem";

const ItemDetails = props => {
  const handleClose = () => {
    props.unsetItemInfo();
  };

  return (
    <Modal open={!!props.selectedMenuItem.id}>
      <Modal.Header>{props.selectedMenuItem.name}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={props.selectedMenuItem.photo_url} />
        <Modal.Description>
          <Header>Description</Header>
          <p>{props.selectedMenuItem.description}</p>
          <p>
            <strong>Ingredients:</strong> {props.selectedMenuItem.ingredients}
          </p>
          <p>
            <strong>Calories:</strong> {props.selectedMenuItem.calories}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleClose} inverted>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    unsetItemInfo: () => dispatch(unsetItemInfo())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ItemDetails);
