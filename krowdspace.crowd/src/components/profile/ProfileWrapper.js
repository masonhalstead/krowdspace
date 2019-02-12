import React, { Component } from 'react';
import PasswordReset from '../modals/PasswordReset';
import Button from 'react-bootstrap/Button';
class ProfileWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{ display: 'flex', background: '#fff', padding: '25px 15px' }}
        >
          <div style={{ width: '30%' }} />
          <div style={{ width: '70%' }}>
            <p style={{ margin: '0px' }}>mason@krowdspace.com</p>
            <p style={{ margin: '0px' }}>Mason Halstead</p>
            <Button variant="primary" type="submit">
              Submit Project
            </Button>
          </div>
        </div>
        <PasswordReset />
      </React.Fragment>
    );
  }
}
export default ProfileWrapper;
