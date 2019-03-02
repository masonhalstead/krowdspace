import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleModal, userLogin, setAuthToken, setLoading, updateUser } from 'actions';
import { ProfileFundingChart } from './ProfileFundingChart';
import { ProfileAnalyticsChart } from './ProfileAnalyticsChart';
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
    data_loaded: false,
    project: {
      name: '',
      image_url: ''
    },
    metrics: {
      funded: [],
      dates: [],
      pledged: [],
      goal: 100,
      pledged_total: 0
    }
  };
  componentDidMount() {
    const { user } = this.props;
    const { pathname } = this.props.location;
    const [, , ,project_id] = pathname.split('/');
    api
      .getProfileProjectData(user.token, project_id)
      .then(res => {
        this.setState({
          project: res.project,
          metrics: res.metrics,
          data_loaded: true
        })
      })
      .catch(err => core.handleError(err));
  }
  render() {
    const { project, metrics, data_loaded } = this.state;
    return (
      <React.Fragment>
        <div className="profile-wrapper">
        <div className="profile-left-container">
          <img src={project.image_url} className="project-image" alt={project.name} />
          </div>
          <div className="profile-right-container">
          </div>
        </div>
        <div className="project-bottom-wrapper">
          <div className="project-metrics-container">
    { data_loaded && <ProfileFundingChart metrics={metrics} project={project} /> }
          </div>
          <div className="project-metrics-container">
    { data_loaded &&  <ProfileAnalyticsChart metrics={metrics} project={project} /> }
          </div>
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
