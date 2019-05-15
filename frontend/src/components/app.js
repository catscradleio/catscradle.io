import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route-util';
import logo from '../logo.svg';
import './app.css';

import Front from './front/front';
import NavBarContainer from './nav/navbar-container';
import LoginFormContainer from './session/login-form-container';
import SignupFormContainer from './session/signup-form-container';
import TestDrawCradle from './test-draw-cradle/test-draw-cradle';

const App = () => {
  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <NavBarContainer /> */}
      <Switch>
        <Route exact path='/test-draw-cradle' component={TestDrawCradle} />
        <AuthRoute exact path="/" component={Front} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>
    </>
  );
}

export default App;
