import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import krowdspace from '../../resources/images/krowdspace-logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
class ConnectedUserLogin extends Component {
  handleCloseModal = () => this.props.toggleModal({ user_login: false });
  render() {
    const { modals } = this.props;
    return (
      <Modal
        className="user-login-modal"
        show={modals.user_login}
        onHide={this.handleCloseModal}
      >
      <div className="user-login-header">
      <img
        className="logo-image"
        src={krowdspace}
        alt="Krowdspace Logo"
        height={34}
      />
      </div>
      <div className="user-login-body">
      <div className="user-login-left">
      <h2 className="user-login-title">Login to Krowdspace</h2>
      <Form autoComplete="off">
        <Form.Group>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="btn-login" variant="primary" type="submit">
          Login
        </Button>
        <Button className="btn-login" variant="secondary" type="submit">
      <FontAwesomeIcon
            icon={['fab', 'google']}
            className="google-icon"
            
          />
          <span className="btn-login-text">Login with Google</span>
        </Button>
      </Form>
      </div>
      <div className="user-login-right">
      <h2 className="user-login-title">Dont have an account?</h2>
      <p>Welcome to Krowdspace! Create an account to submit a project or access extra content.</p>
      <p className="user-welcome-text">Sign up now</p>
      </div>
      </div>
        
      </Modal>
    );
  }
}

const UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUserLogin);
export default UserLogin;
