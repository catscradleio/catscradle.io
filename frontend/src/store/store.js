import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';

const configureStore = (preloadedState = {}) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(logger, thunk)
);

export default configureStore;
