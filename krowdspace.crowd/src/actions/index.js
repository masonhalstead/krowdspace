import { SET_DISPLAY, USER_LOGOUT, TOGGLE_MODAL } from '../constants/action-types';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal
});
export const setDisplay = display => ({
  type: SET_DISPLAY,
  payload: display
});
export const userLogout = user => ({
  type: USER_LOGOUT,
  payload: user
})
