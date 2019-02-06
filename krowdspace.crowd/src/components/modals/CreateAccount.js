import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
  return {
    modals: state.modals
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal))
  };
};
class ConnectedCreateAccount extends Component {
  handleCloseModal = () => {
    this.props.toggleModal({ create_account: false });
  };
  render() {
    return (
      <Modal
        show={this.props.modals.create_account}
        onHide={this.handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const CreateAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateAccount);
export default CreateAccount;
