import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  homeRoute,
  loginRoute,
  registerRoute,
  userImagesRoute,
  uploadImagesRoute,
  userDeleteImagesRoute,
} from '../constants/strings';
import AuthForm from '../components/auth/AuthForm';
import ImageRepository from '../components/ImageRepository/ImageRepository';
import AuthService from '../services/AuthService';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import ImageDelete from '../components/ImageDelete/ImageDelete';

export default function Routes() {
  return (
    <Switch>
      <Route
        exact
        path={homeRoute}
        component={(props) => (
          <ImageRepository
            {...props}
            isAuthenticated={AuthService.isAuthenticated()}
            fetchType={'publicImages'}
          />
        )}
      />
      <Route exact path={uploadImagesRoute} component={(props) => <ImageUpload {...props} />} />
      <Route
        exact
        path={userDeleteImagesRoute(':user_id')}
        component={(props) => <ImageDelete {...props} />}
      />
      <Route
        exact
        path={userImagesRoute(':user_id')}
        component={(props) => (
          <ImageRepository
            {...props}
            isAuthenticated={AuthService.isAuthenticated()}
            fetchType={'userImages'}
          />
        )}
      />
      <Route exact path={loginRoute} component={(props) => <AuthForm {...props} type="Login" />} />
      <Route
        exact
        path={registerRoute}
        component={(props) => <AuthForm {...props} type="Register" />}
      />
      <Route path="*" component={() => <Redirect to={homeRoute} />} />
    </Switch>
  );
}
