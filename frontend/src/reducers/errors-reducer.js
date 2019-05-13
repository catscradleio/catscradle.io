import { combineReducers } from 'redux';

import SessionErrorsReducer from './session-errors-reducer';

export default combineReducers({
  session: SessionErrorsReducer
});
