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
class ConnectedProjectSettings extends Component {
  handleCloseModal = () => this.props.toggleModal({ project_settings: false });
  render() {
    const { modals } = this.props;
    return (
      <Modal
        className="user-create-modal"
        show={modals.project_settings}
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
        <h2 className="user-create-title">Project Settings</h2>
        <p>Project owners can enable their project to be featured on Krowdspace. Featured projects are displayed on all user profile pages.</p>
        <p>Project owners can also change their primary category.</p>
        </div>
      </Modal>
    );
  }
}

const ProjectSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedProjectSettings);
export default ProjectSettings;
