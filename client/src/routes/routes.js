import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { homeRoute, loginRoute, registerRoute } from '../constants/strings';
import AuthForm from '../components/auth/AuthForm';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={homeRoute} component={(props) => <div>Image Gallery</div>} />
      <Route exact path={loginRoute} component={(props) => <AuthForm {...props} type="Login" />} />
      <Route
        exact
        path={registerRoute}
        component={(props) => <AuthForm {...props} type="Register" />}
      />
    </Switch>
  );
}
