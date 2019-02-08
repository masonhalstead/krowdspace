import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, userLogin, setAuthToken, setLoading } from '../../actions/';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import krowdspace from '../../resources/images/krowdspace-logo.svg';
import { api } from '../../resources/js/krowdspace.api';
import { core } from '../../resources/js/krowdspace.core';

const { REACT_APP_GOOGLE_ID } = process.env;

const mapStateToProps = state => {
  return {
    modals: state.modals
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal)),
    userLogin: user => dispatch(userLogin(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setLoading: setting => dispatch(setLoading(setting))
  };
};
class ConnectedUserLogin extends Component {
  handleCloseModal = () => this.props.toggleModal({ user_login: false });
  handleGoogleAuth = res => {
    const { setAuthToken, userLogin, setLoading, toggleModal } = this.props;
    const data = { token: res.tokenId };
    
    setLoading(true);

    api.publicPost('/api/auth/google', data).then((res) => {
      setAuthToken(res.data)
      return api.getData('/api/users/me', res.data);
    }).then((res) => {
      userLogin(res.data);
      toggleModal({ user_login: false })
      setLoading(false);
    })
    .catch((err) => {
      toggleModal({ user_login: false })
      core.handleError(err)
    })
  };
  render() {
    const { modals } = this.props;
    return (
      <Modal
        className="user-login-modal"
        show={modals.user_login}
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
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_ID}
                render={props => (
                  <Button
                    className="btn-login"
                    variant="secondary"
                    onClick={props.onClick}
                  >
                    <FontAwesomeIcon
                      icon={['fab', 'google']}
                      className="google-icon"
                    />
                    <span className="btn-login-text">Login with Google</span>
                  </Button>
                )}
                buttonText="Login"
                onSuccess={this.handleGoogleAuth}
                onFailure={this.handleGoogleAuth}
              />
            </Form>
          </div>
          <div className="user-login-right">
            <h2 className="user-login-title">Dont have an account?</h2>
            <p>
              Welcome to Krowdspace! Create an account to submit a project or
              access extra content.
            </p>
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
