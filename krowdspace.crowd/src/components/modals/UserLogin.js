import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  toggleModal,
  userLogin,
  setAuthToken,
  setLoading
} from '../../actions/';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router';
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
const initial_state = {
  email: '',
  password: ''
};
class ConnectedUserLogin extends Component {
  state = Object.assign({}, initial_state);

  handleOnInput = e => this.setState({ [e.target.name]: e.target.value });
  handleCloseModal = () =>
    this.setState({ ...initial_state }, () =>
      this.props.toggleModal({ user_login: false })
    );
  handleCreateUserModal = () =>
    this.setState({ ...initial_state }, () =>
      this.props.toggleModal({ user_login: false, create_account: true })
    );
  handlePost = (url, data) => {
    const {
      setAuthToken,
      userLogin,
      setLoading,
      toggleModal,
      history
    } = this.props;

    setLoading(true);

    api
      .publicPost(url, data)
      .then(res => {
        // Get the token and set
        setAuthToken(res.data);

        // Return axios promise and get user data
        return api.getData('/api/users/me', res.data);
      })
      .then(res => {
        // Set initial state and handle response
        this.setState({ ...initial_state }, () => {
          userLogin(res.data);
          toggleModal({ user_login: false });
          setLoading(false);
          history.push('/profile');
        });
      })
      .catch(err => {
        // Set initial state and handle response
        this.setState({ ...initial_state }, () => {
          toggleModal({ user_login: false });
          core.handleError(err);
        });
      });
  };
  handleGoogleAuth = res => {
    // Only handle post if the google auth was successful
    if (res.tokenId) {
      const data = { token: res.tokenId };
      this.handlePost('/api/auth/google', data);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };

    // Always allow post if button is enabled
    this.handlePost('/api/auth', data);
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
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={e => this.handleOnInput(e)}
                  placeholder="Enter email address"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={e => this.handleOnInput(e)}
                  placeholder="Password"
                />
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
            <p
              className="user-welcome-text"
              onClick={this.handleCreateUserModal}
            >
              Sign up now
            </p>
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
const UserLoginWithRouter = withRouter(UserLogin);
export default UserLoginWithRouter;
