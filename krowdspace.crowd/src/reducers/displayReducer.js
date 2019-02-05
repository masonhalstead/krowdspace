import { SET_DISPLAY } from '../constants/action-types';
const displayInitialState = {
  navbar_height: 44,
  side_panel_width: 46,
  active_menu: true
};

export const displayReducer = (state = displayInitialState, action) => {
  switch (action.type) {
    case SET_DISPLAY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
