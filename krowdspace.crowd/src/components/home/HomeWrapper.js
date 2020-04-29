import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal, userLogin, setAuthToken, setLoading, updateUser } from 'actions';
import {ProjectCards} from 'components/common/ProjectCards';
import Button from 'react-bootstrap/Button';

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
class ConnectedHomeWrapper extends Component {
  state = {
    limit: 1,
    page: 0,
    projects: []
  }
  handleMoreProjects = () => {
    let { page } = this.state;
    page = page + 1;
    this.setState({page: page}, () => this.getProjectsData())
  }
  getProjectsData = () => {
    const { setLoading } = this.props;
    let { projects, limit, page } = this.state;
    console.log('here', page)
    // Show loading icon
    setLoading(true);

    api
      .getProjectsData(limit, page)
      .then(res => {
        setLoading(false);
        projects = [...projects, ...res]
        this.setState({ projects});
      })
      .catch(err => core.handleError(err));
  }
  componentDidMount() {
    this.getProjectsData();
  }
  render() {
    const { projects } = this.state;
    return (
      <React.Fragment>
        <div className="hub-wrapper">
          <h1>Back the Project, not the Platform</h1>
          <p>
            At Krowdspace, our goal is to unify the crowdfunding community.
            Krowdspace members will receive exclusive rewards for backing
            projects and project owners gain access to our easy to use
            promotional tools and resources to take their campaigns to the next
            level.
          </p>
        </div>
        <ProjectCards projects={projects} />
        <Button
        className="btn-login"
        variant="primary"
        type="button"
        onClick={this.handleMoreProjects}
      >
        View More
      </Button>
      </React.Fragment>
    );
  }
}
const HomeWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHomeWrapper);
export default HomeWrapper;
