import { SET_DISPLAY } from '../constants/action-types';

export const setDisplay = display => ({
  type: SET_DISPLAY,
  payload: display
});
