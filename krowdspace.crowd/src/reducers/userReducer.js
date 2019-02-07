import { USER_LOGOUT, USER_LOGIN, SET_TOKEN, CHECK_USER } from '../constants/action-types';
import { core } from '../resources/js/krowdspace.core';

const user = {
  name: false,
  email: false,
  active: false,
  token: false,
  _id: false
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case CHECK_USER:
      return core.getLocalStorage();
    case SET_TOKEN:
      localStorage.setItem('token', action.payload);
    return { ...state, token: action.payload };
    case USER_LOGIN:
      core.setLocalStorage(action.payload);
      return { ...state, ...action.payload, active: true };
    case USER_LOGOUT:
      return { ...user };
    default:
      return state;
  }
};
