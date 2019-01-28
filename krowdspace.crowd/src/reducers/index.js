import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { displayReducer } from './displayReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  display: displayReducer
});

export default rootReducer;
