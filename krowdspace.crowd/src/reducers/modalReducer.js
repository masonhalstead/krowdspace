import { TOGGLE_MODAL } from '../constants/action-types';

const modals = {
  create_account: false,
  user_login: false,
  user_error: false,
  submit_project: false,
  project_marketing: false,
  project_settings: false
};
export const modalReducer = (state = modals, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
