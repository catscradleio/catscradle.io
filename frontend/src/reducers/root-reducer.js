import { combineReducers } from 'redux';
import session from './session-api-reducer';
import errors from './errors-reducer';
import users from './users-reducer';
import cradles from './cradles_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  users,
  cradles
});

export default rootReducer;
