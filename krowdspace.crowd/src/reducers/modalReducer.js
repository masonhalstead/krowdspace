import { TOGGLE_MODAL } from '../constants/action-types';

const modals = {
  create_account: false,
  user_login: false
};
export const modalReducer = (state = modals, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
