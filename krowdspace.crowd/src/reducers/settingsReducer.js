import { LOADING, ERROR_MESSAGE } from '../constants/action-types';

const settings = {
  loading: false,
  error: ''
};

export const settingsReducer = (state = settings, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case ERROR_MESSAGE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
