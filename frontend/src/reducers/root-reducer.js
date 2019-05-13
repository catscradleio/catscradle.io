import { combineReducers } from 'redux';
import session from './session-api-reducer';
import errors from './errors-reducer';
import users from './users-reducer';

const rootReducer = combineReducers({
  session,
  errors,
  users
});

export default rootReducer;
