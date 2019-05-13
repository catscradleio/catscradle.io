import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import './index.css';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session-api-util';
import { logout } from './actions/session-actions';
//TESTING
import {fetchCradles, fetchCradle, storeCradle} from './actions/cradle_actions';
//TESTING

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

  //TESTING
  window.state = store.getState;
  window.fetchCradles = fetchCradles;
  window.fetchCradle = fetchCradle;
  window.storeCradle = storeCradle;
  window.dispatch = store.dispatch;
  //TESTING

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
