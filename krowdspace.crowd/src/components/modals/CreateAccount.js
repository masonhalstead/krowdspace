import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleModal, userLogin, setAuthToken, setLoading } from 'actions';
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
const initial_state = {
  name: '',
  email: '',
  password: '',
  password_error: '',
  password_strength: 0,
  agree: false,
  valid: false
};
class ConnectedCreateAccount extends Component {
  state = Object.assign({}, initial_state);

  handleCloseModal = () => this.props.toggleModal({ create_account: false });
  handleCheckToggle = () =>
    this.setState(
      {
        agree: !this.state.agree,
        valid: false
      },
      () => this.isValidForm()
    );
  handleOnInput = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        valid: false
      },
      () => this.isValidForm()
    );
  };
  isValidForm = () => {
    let state = this.state;

    const {
      name,
      email,
      agree,
      password_strength,
      password
    } = core.passwordValidation(state);

    this.setState({ password_strength: password_strength });

    if (
      name &&
      email &&
      agree &&
      password &&
      password.length >= 8 &&
      password_strength >= 2
    ) {
      this.setState({ valid: true, password_error: '' });
    } else if (password.length === 0 || password.length >= 8) {
      this.setState({ password_error: '' });
    } else if (password.length < 8) {
      this.setState({ password_error: 'must be at least 8 characters' });
    }
  };
  handlePost = (url, data) => {
    const {
      setAuthToken,
      userLogin,
      setLoading,
      toggleModal,
      history
    } = this.props;

    // Show loading icon
    setLoading(true);

    // Pass data to the public API route
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
          toggleModal({ create_account: false });
          setLoading(false);
          history.push('/profile');
        });
      })
      .catch(err => {
        // Set initial state and handle response
        this.setState({ ...initial_state }, () => {
          toggleModal({ create_account: false });
          core.handleError(err);
        });
      });
  };
  handleGoogleAuth = res => {
    // Only handle post if the google auth was successful
    if (res.tokenId) {
      const data = { token: res.tokenId };
      this.handlePost('/api/users/google', data);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const data = {
      name,
      email,
      password,
      password_reset: false
    };

    // Always allow post if button is enabled
    this.handlePost('/api/users/create', data);
  };
  render() {
    const { modals } = this.props;
    const {
      name,
      email,
      password,
      valid,
      password_error,
      password_strength,
      agree
    } = this.state;
    return (
      <Modal
        className="user-create-modal"
        show={modals.create_account}
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
          <h2 className="user-create-title">Create Krowdspace Account</h2>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <Form.Label>User Information</Form.Label>
            <Form.Group>
              <Form.Control
                name="name"
                onChange={e => this.handleOnInput(e)}
                value={name}
                type="text"
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="email"
                onChange={e => this.handleOnInput(e)}
                value={email}
                type="email"
                placeholder="Enter email address"
              />
            </Form.Group>
            <div className="user-password-container">
              <Form.Label className="user-password-label">
                Password {password_error}
              </Form.Label>
              {password_strength < 2 && (
                <Form.Label className="krowdspace-danger">
                  Complexity
                </Form.Label>
              )}
              {password_strength === 2 && (
                <Form.Label className="krowdspace-warning">
                  Complexity
                </Form.Label>
              )}
              {password_strength > 2 && (
                <Form.Label className="krowdspace-success">
                  Complexity
                </Form.Label>
              )}
              <div />
            </div>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                onChange={e => this.handleOnInput(e)}
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                onChange={this.handleCheckToggle}
                label="I agree to Krowdspace Terms &amp; Conditions"
                checked={agree}
              />
            </Form.Group>
            <Button
              className="btn-login"
              variant="primary"
              type="submit"
              disabled={!valid}
            >
              Sign up
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
                  <span className="btn-login-text">Sign up with Google</span>
                </Button>
              )}
              onSuccess={this.handleGoogleAuth}
              onFailure={this.handleGoogleAuth}
            />
          </Form>
        </div>
      </Modal>
    );
  }
}

const CreateAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateAccount);
const CreateAccountWithRouter = withRouter(CreateAccount);
export default CreateAccountWithRouter;
