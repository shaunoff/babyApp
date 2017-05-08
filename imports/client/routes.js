import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
import App from './App';
import Login from './pages/Login';
import Test from './pages/Test';
import Google from './pages/Google';
import Download from './pages/Download';

const requireAuth = (nextState,replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()){
    replace({
      pathname: 'google',
      state: {nextPathname: nextState.location.pathname}

    })
  }
}

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout} onEnter={requireAuth}>
        <IndexRoute component={App} />
        <Route path="/test" component={Test}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path="/download" component={Download}/>
      <Route path="/google" component={Google}/>
    </Router>,
    document.getElementById('render-target')
  );
});
