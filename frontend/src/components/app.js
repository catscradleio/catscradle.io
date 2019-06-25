import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route-util';
import Feed from './feed/feed';
import ProfileContainer from '../components/user/profile_container';
import './app.css';

import Front from './front/front';

const App = () => {
  return (
    <>
      <Switch>
        <AuthRoute exact path="/" component={Front} />
        <ProtectedRoute exact path='/profile' component={ProfileContainer} />
        <ProtectedRoute exact path='/doodles' component={Feed} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
