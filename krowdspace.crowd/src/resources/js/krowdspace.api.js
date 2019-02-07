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
  getData: function(url, token) {
    return axios({
      method: 'get',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });
  }
};
