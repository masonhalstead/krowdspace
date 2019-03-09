import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, userLogin, setAuthToken, setLoading, updateUser } from 'actions';

import { ProfileCarousel } from './ProfileCarousel';
import { ProfileForm } from './ProfileForm';
import { ProfileMetrics } from './ProfileMetrics';
import { ProfileProjects } from './ProfileProjects';

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
class ConnectedProfileWrapper extends Component {
  state = {
    name: '',
    email: '',
    kickstarter_user: '',
    indiegogo_user: '',
    likes: [],
    comments: [],
    projects: [],
    viewed: 0,
    project_count: 0,
    owned: [],
    valid: false,
    featured: [
      {
        name: 'sdfsdsdf',
        image_url: 'https://www.fillmurray.com/512/288',
        uri: 'sdfsdfsdf',
        description: 'ssfdsfsdf'
      }
    ]
  };
  handleOnInput = e => this.setState({ [e.target.name]: e.target.value, valid: true });
  handleSubmit = (e) => {
    e.preventDefault()
    const { name, kickstarter_user, indiegogo_user } = this.state;
    const { user, setLoading, updateUser } = this.props;

    const data = {
      name,
      kickstarter_user,
      indiegogo_user
    }

    // Show loading icon
    setLoading(true);

    //Pass data to the public API route
    api
      .postData('/api/users/update', data, user.token)
      .then(res => {
        updateUser(res.data);
        setLoading(false);
      })
      .catch(err => core.handleError(err));
    
  };
  componentDidMount() {
    const { user, setLoading } = this.props;
    let { featured } = this.state;

    // Show loading icon
    setLoading(true);

    api
      .getProfileData(user.token)
      .then(res => {
        featured = [...res.featured_projects, ...featured];
        setLoading(false);
        this.setState({ featured, ...res.user, valid: false });
      })
      .catch(err => core.handleError(err));
  }
  render() {
    const {
      featured,
      valid,
      name,
      email,
      kickstarter_user,
      indiegogo_user,
      likes,
      comments,
      projects,
      viewed,
      project_count
    } = this.state;
    return (
      <React.Fragment>
        <div className="profile-wrapper">
          <div className="profile-left-container">
            { featured.length > 1 && <ProfileCarousel featured={featured} /> }
          </div>
          <div className="profile-right-container">
            <ProfileForm
              valid={valid}
              name={name}
              email={email}
              kickstarter_user={kickstarter_user}
              indiegogo_user={indiegogo_user}
              handleSubmit={this.handleSubmit}
              handleOnInput={this.handleOnInput}
            />
            <ProfileMetrics
              project_count={project_count}
              likes={likes.length}
              comments={comments.length}
              viewed={viewed}
              projects={projects.length}
            />
          </div>
        </div>
        <ProfileProjects projects={projects} />
      </React.Fragment>
    );
  }
}
const ProfileWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedProfileWrapper);
export default ProfileWrapper;
