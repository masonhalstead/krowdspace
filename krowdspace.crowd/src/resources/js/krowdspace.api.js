import axios from 'axios';
const { REACT_APP_HOST } = process.env;

export const api = {
  publicPost: function(url, data) {
    return axios({
      method: 'post',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  },
  publicGet: function(url) {
    return axios({
      method: 'get',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getData: function(url, token) {
    return axios({
      method: 'get',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });
  },
  putData: function(url, data, token) {
    return axios({
      method: 'put',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      data: data
    });
  },
  postData: function(url, data, token) {
    return axios({
      method: 'post',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      data: data
    });
  },
  getProfileData: function(token) {
    return axios
      .all([
        this.getData('/api/users/me', token),
        this.getData('/api/projects/featured', token)
      ])
      .then(
        axios.spread((user, featured_projects) => {
          const { kickstarter_user, indiegogo_user } = user.data;
          user = {
            ...user.data,
            kickstarter_user: kickstarter_user === null ? '' : kickstarter_user,
            indiegogo_user: indiegogo_user === null ? '' : indiegogo_user
          };
          return {
            user: user,
            projects: user.projects,
            featured_projects: featured_projects.data
          };
        })
      );
  },
  getProfileProjectData: function(token, project_id) {
    return axios
      .all([this.getData(`/api/users/projects/${project_id}`, token)])
      .then(axios.spread((res) => res.data));
  },
  getProjectsData: function(limit, page) {
    const data = {
      limit: limit,
      page: page
    }
    return axios
      .all([this.publicPost(`/api/projects`, data)])
      .then(axios.spread((res) => res.data));
  },
};
