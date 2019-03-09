import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, setAuthToken, setLoading, userLogin } from 'actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import krowdspace from '../../resources/images/krowdspace-logo.svg';

const mapStateToProps = state => {
  return {
    modals: state.modals,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userLogin: user => dispatch(userLogin(user)),
    toggleModal: modal => dispatch(toggleModal(modal)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setLoading: setting => dispatch(setLoading(setting))
  };
};
class ConnectedAllowMarketing extends Component {
  handleCloseModal = () => this.props.toggleModal({ project_marketing: false });
  render() {
    const { modals } = this.props;
    return (
      <Modal
        className="user-create-modal"
        show={modals.project_marketing}
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
        <div className="user-create-body">
        <h2 className="user-create-title">Allow Product Marketing</h2>
        <p>Project owners have the option to turn on product marketing with Krowdspace. This will transition your crowfunding campaign to our marketplace and link directly to your retail store.</p>
        <p>All you need to do is set Product marketing to live and enter a retail link where your product is being sold!</p>
        </div>
      </Modal>
    );
  }
}

const AllowMarketing = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAllowMarketing);
export default AllowMarketing;
