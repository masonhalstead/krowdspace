import { USER_LOGOUT } from '../constants/action-types';

const user = {
  first_name: 'Mason',
  last_name: 'Halstead',
  email: 'mason@krowdspace.com',
  active: true
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, active: false };
    default:
      return state;
  }
};
