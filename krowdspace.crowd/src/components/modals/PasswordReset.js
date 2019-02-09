import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePasswordReset, updateUser, setAuthToken, setLoading } from 'actions';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import krowdspace from '../../resources/images/krowdspace-logo.svg';
import { core } from 'resources/js/krowdspace.core.js';
import { api } from 'resources/js/krowdspace.api.js';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    togglePasswordReset: user => dispatch(togglePasswordReset(user)),
    updateUser: user => dispatch(updateUser(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setLoading: setting => dispatch(setLoading(setting))
  };
};
const initial_state = {
    password: '',
    password_error: false,
    password_strength: 0,
    valid: false
}
class ConnectedPasswordReset extends Component {
state = Object.assign({}, initial_state);
  handleCloseModal = () => this.props.togglePasswordReset(false);
  handleOnInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value, 
      valid: false
    }, () => this.isValidForm())
  }
  isValidForm = () => {
    let state = this.state;
    
    const { password_strength, password } = core.passwordValidation(state);

    this.setState({ password_strength: password_strength });

    if (
      password &&
      password.length >= 8 &&
      password_strength >= 2
    ) {
      this.setState({ valid: true, password_error: '' });
    }else if(password.length === 0 || password.length >= 8){
      this.setState({ password_error: '' });
    }else if(password.length < 8){
      this.setState({ password_error: 'must be at least 8 characters' });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { setLoading, user, updateUser } = this.props;
    const { password } = this.state;
    const data = { password };

    // Show loading icon
    setLoading(true);
    // Pass data to the public API route
    api.putData('/api/users/password-reset', data, user.token).then((res) => {

      // Set initial state and handle response
      this.setState({...initial_state}, () => {
        localStorage.setItem('password_reset', false);
        updateUser({password_reset: false})
        setLoading(false);
      });
    })
    .catch((err) => {
      // Set initial state and handle response
      this.setState({...initial_state}, () => {
        updateUser({password_reset: false})
        core.handleError(err)
      })
    })
  }
  render() {
    const { user } = this.props;
    const { password, password_error, password_strength, valid } = this.state
    return (
      <Modal
        className="user-password-modal"
        show={JSON.parse(user.password_reset)}
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
        <div className="user-error-body" style={{textAlign: 'left'}}>
            <p>
                Thank you for creating an account through Google! Please set a new password so you can optionally login through Krowdspace. This will not prevent you from signing in with your Google account.
            </p>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="user-password-container">
              <Form.Label className="user-password-label">Password {password_error}</Form.Label>
              { password_strength < 2 && <Form.Label className="krowdspace-danger">Complexity</Form.Label> }
              { password_strength === 2 && <Form.Label className="krowdspace-warning">Complexity</Form.Label> }
              { password_strength > 2 && <Form.Label className="krowdspace-success">Complexity</Form.Label> }
              <div>
                
              </div>
              </div>
              <Form.Group>
                <Form.Control type="password" name="password" onChange={(e) => this.handleOnInput(e)} value={password} placeholder="Password"/>
              </Form.Group>
              <Button className="btn-login" variant="primary" type="submit" disabled={!valid}>
                Set password
              </Button>
            </Form>
        </div>
      </Modal>
    );
  }
}

const PasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedPasswordReset);
export default PasswordReset;
