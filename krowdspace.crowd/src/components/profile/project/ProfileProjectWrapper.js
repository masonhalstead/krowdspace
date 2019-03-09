import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleModal, userLogin, setAuthToken, setLoading, updateUser } from 'actions';
import { ProfileProjectForm } from './ProfileProjectForm';
import { ProfileFundingChart } from './ProfileFundingChart';
import { ProfileAnalyticsChart } from './ProfileAnalyticsChart';
import { ProfileProjectMetrics } from './ProfileProjectMetrics';
import isUrl from 'is-url';
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
    valid: false,
    project: {
      name: '',
      image_url: '',
      short_link: '',
      comments: [],
      featured: false,
      category: '',
      retail_url: '',
      allow_marketing: false
    },
    metrics: {
      funded: [],
      dates: [],
      backers: [],
      pledged: [],
      views: [],
      backers_total: 0,
      likes_total: 0,
      views_total: 0,
      pledged_total: 0,
      goal: 100
    }
  };
  handleToggleModal = (toggle) => {
    const { toggleModal } = this.props;
    toggleModal(toggle);
  }
  handleProductMarketing = () => {
    let { project } = this.state;
    project.allow_marketing = !project.allow_marketing;
    this.setState({project, valid: false }, () => this.isValid())
  }
  handleFeaturedProject = () => {
    let { project } = this.state;
    project.featured = !project.featured;
    this.setState({project, valid: true})
  }
  handleProjectCategory = (e) => {
    let { project } = this.state;
    project.category = e.target.value;
    this.setState({project, valid: true})
  }
  handleOnInput = e => {
    let { project } = this.state;
    project.retail_url = e.target.value;
    this.setState({project, valid: false}, () => this.isValid())
  }

  isValid = () => {
    const { project } = this.state;
    if(project.allow_marketing && isUrl(project.retail_url)){
      this.setState({valid: true})
    }else if(!project.allow_marketing && !project.retail_url){
      this.setState({valid: true})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { project } = this.state;
    const { user, setLoading } = this.props;

    const data = {
      featured: project.featured,
      allow_marketing: project.allow_marketing || false,
      category: project.category,
      retail_url: project.retail_url || ''
    }

    // Show loading icon
    setLoading(true);
    this.setState({data_loaded: false});

    //Pass data to the public API route
    api
      .putData(`/api/projects/${project.uri}/update`, data, user.token)
      .then(res => {
        return api.getProfileProjectData(user.token, project.uri)
      }).then(res => {
        this.setState({
          project: res.project,
          metrics: res.metrics,
          data_loaded: true,
          valid: false
        });
        setLoading(false);
      })
      .catch(err => core.handleError(err));
    
  };
  componentDidMount() {
    const { user, setLoading } = this.props;
    const { pathname } = this.props.location;
    const [, , ,project_id] = pathname.split('/');

    setLoading(true);

    api
      .getProfileProjectData(user.token, project_id)
      .then(res => {
        this.setState({
          project: res.project,
          metrics: res.metrics,
          data_loaded: true
        });
        setLoading(false);
      })
      .catch(err => core.handleError(err));
  }
  render() {
    const { project, metrics, data_loaded, valid } = this.state;
    return (
      <React.Fragment>
        <div className="profile-wrapper">
        <div className="profile-left-container">
          <img src={project.image_url} className="project-image" alt={project.name} />
          </div>
          <div className="profile-right-container">
          <div className="profile-project-header-wrapper">
          <h2 className="profile-project-header-title">{project.name}</h2>
          <Link to ={`/profile`}>
          <FontAwesomeIcon 
            className="profile-back-btn"
            icon={['fas', 'long-arrow-alt-left']}
            size="lg" />
          </Link>
          </div>
          <ProfileProjectForm
              valid={valid}
              featured={project.featured}
              category={project.category}
              allow_marketing={project.allow_marketing}
              retail_url={project.retail_url}
              handleProductMarketing={this.handleProductMarketing}
              handleProjectCategory={this.handleProjectCategory}
              handleFeaturedProject={this.handleFeaturedProject}
              handleToggleModal={this.handleToggleModal}
              handleSubmit={this.handleSubmit}
              handleOnInput={this.handleOnInput}
            />
          { data_loaded && < ProfileProjectMetrics
          backers={metrics.backers_total}
          likes={metrics.likes_total}
          comments={project.comments.length}
          views={metrics.views_total}
          pledged={metrics.pledged_total}
          /> }
          </div>
        </div>
        <div className="project-bottom-wrapper">
          <div className="project-metrics-container">
          { data_loaded && <ProfileFundingChart metrics={metrics} /> }
          </div>
          <div className="project-metrics-container">
          { data_loaded &&  <ProfileAnalyticsChart metrics={metrics} /> }
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
