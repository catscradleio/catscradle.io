import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route-util';
import logo from '../logo.svg';
import './app.css';

import Front from './front/front';
import NavBarContainer from './nav/navbar-container';
import LoginFormContainer from './session/login-form-container';
import SignupFormContainer from './session/signup-form-container';

const App = () => {
  return (
    <>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <NavBarContainer /> */}
      <Switch>
        <AuthRoute exact path="/" component={Front} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>
    </>
  );
}

export default App;
