import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  toggleModal,
  userLogin,
  setAuthToken,
  setLoading
} from 'actions';

import { ProfileCarousel } from './ProfileCarousel';
import { ProfileForm } from './ProfileForm';
import { ProfileMetrics } from './ProfileMetrics';

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
    setLoading: setting => dispatch(setLoading(setting))
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
    views: 0,
    project_count: 0,
    owned: [],
    loaded: false,
    valid: false,
    featured: [{
      name: 'sdfsdsdf',
      image_url: 'https://www.fillmurray.com/512/288',
      uri: 'sdfsdfsdf',
      description: 'ssfdsfsdf'
    }]
  }
  handleOnInput = (e) => this.setState({[e.target.name]:e.target.value, valid: true});
  handleSubmit = () => {

  }
  componentDidMount(){
    const { user } = this.props;
    let { featured } = this.state
    api
      .getProfileData(user.token)
      .then(res => {
        featured = [...res.featured_projects, ...featured]
        this.setState({featured, ...res.user, valid: false})
      })
      .catch(err => core.handleError(err));
  }
  render() {
    const { featured, valid, name, email, kickstarter_user, indiegogo_user, likes, comments, projects, views, project_count } = this.state;
    return (
      <React.Fragment>
        <div
          style={{ display: 'flex', background: '#fff', padding: '25px 15px' }}
        >
          <div style={{ width: '550px', padding: '0px 15px' }} >
            <ProfileCarousel featured={featured}/>
          </div>
          <div style={{ width: '400px', padding: '0px 15px' }}>
          <ProfileForm valid={valid} name={name} email={email} kickstarter_user={kickstarter_user} indiegogo_user={indiegogo_user} handleSubmit={this.handleSubmit} handleOnInput={this.handleOnInput}/>
          </div>
          <div className="profile-right-container">
          <ProfileMetrics project_count={project_count} likes={likes.length} comments={comments.length} views={views} projects={projects.length}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const ProfileWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedProfileWrapper);
export default ProfileWrapper;
