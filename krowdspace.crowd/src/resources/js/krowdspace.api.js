import axios from 'axios';
const { REACT_APP_HOST } = process.env;

export const api = {
  authLogin: function() {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_HOST}/api/auth`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: 'mason@krowdspace.com',
        password: 'Krowdspace88!'
      }
    });
  },
  getData: function(url) {
    return axios({
      method: 'get',
      url: `${REACT_APP_HOST}${url}`,
      headers: {
        'x-auth-token': 'dsfsdfsdfs',
        'Content-Type': 'application/json'
      }
    });
  }
};
