import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { displayReducer } from './displayReducer';
import { modalReducer } from './modalReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  display: displayReducer,
  modals: modalReducer
});

export default rootReducer;
