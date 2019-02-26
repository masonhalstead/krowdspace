import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleModal, userLogin, setAuthToken, setLoading, updateUser } from 'actions';
import { api } from 'resources/js/krowdspace.api';
import { core } from 'resources/js/krowdspace.core';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: modal => dispatch(toggleModal(modal)),
    userLogin: user => dispatch(userLogin(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setLoading: setting => dispatch(setLoading(setting)),
    updateUser: user => dispatch(updateUser(user))
  };
};
class ConnectedProfileProjectWrapper extends Component {
  state = {
    name: ''
  };
  componentDidMount() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    const [, , ,project_id] = pathname.split('/');
    api
      .getProfileProjectData(user.token, project_id)
      .then(res => {
        console.log(res)
      })
      .catch(err => core.handleError(err));
  }
  render() {
    return (
      <React.Fragment>
        <div className="profile-wrapper">
sdfsdfsdfsd
        </div>
      </React.Fragment>
    );
  }
}
const ProfileProjectWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedProfileProjectWrapper);
const ProfileProjectWrapperWithRouter = withRouter(ProfileProjectWrapper);
export default ProfileProjectWrapperWithRouter;
