import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import krowdspace from '../../resources/images/krowdspace-logo.svg';

const mapStateToProps = state => {
  return {
    modals: state.modals,
    settings: state.settings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal))
  };
};
class ConnectedErrorMessage extends Component {
  handleCloseModal = () => this.props.toggleModal({ user_error: false });
  render() {
    const { modals, settings } = this.props;
    const { error } = settings;
    return (
      <Modal
        className="user-error-modal"
        show={modals.user_error}
        onHide={this.handleCloseModal}
      >
      <FontAwesomeIcon
              onClick={this.handleCloseModal}
              className="modal-close-icon"
              icon={['fas', 'times']}
              size="sm"
            />
        <div className="user-login-header">
          <img
            className="logo-image"
            src={krowdspace}
            alt="Krowdspace Logo"
            height={34}
          />
        </div>
        <div className="user-error-body">
            <p>
              Looks like you ran into an error trying to connect to our servers. If the error continues please reach out to Krowdspace directly through our social media channels.
            </p>
            { error && <p className="error-message">{error}</p> }
        </div>
      </Modal>
    );
  }
}

const ErrorMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedErrorMessage);
export default ErrorMessage;
