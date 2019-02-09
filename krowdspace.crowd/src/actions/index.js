import {
  SET_DISPLAY,
  USER_LOGOUT,
  TOGGLE_MODAL,
  USER_LOGIN,
  SET_TOKEN,
  CHECK_USER,
  LOADING,
  ERROR_MESSAGE,
  PASSWORD_RESET,
  UPDATE_USER
} from '../constants/action-types';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal
});
export const setDisplay = display => ({
  type: SET_DISPLAY,
  payload: display
});
export const userLogin = user => ({
  type: USER_LOGIN,
  payload: user
});
export const userLogout = user => ({
  type: USER_LOGOUT,
  payload: user
});
export const setAuthToken = token => ({
  type: SET_TOKEN,
  payload: token
})
export const checkUserAuth = user => ({
  type: CHECK_USER,
  payload: user
})
export const setLoading = setting => ({
  type: LOADING,
  payload: setting
})
export const setError = setting => ({
  type: ERROR_MESSAGE,
  payload: setting
})
export const togglePasswordReset = user => ({
  type: PASSWORD_RESET,
  payload: user
})
export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user
})