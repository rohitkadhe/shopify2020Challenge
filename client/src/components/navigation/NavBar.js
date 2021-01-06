import React, { useState } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import AuthService from '../../services/AuthService';
import {
  homeRoute,
  userImagesRoute,
  uploadImagesRoute,
  userDeleteImagesRoute,
} from '../../constants/strings';

export default function NavBar({ history }) {
  const [activeItem, setActiveItem] = useState('All Images');

  let isAuthenticated = AuthService.isAuthenticated();
  let authString = isAuthenticated ? 'Logout' : 'Login';

  return (
    <Menu pointing secondary style={{ margin: '1em' }} color="teal">
      <Menu.Item header>Sort By</Menu.Item>
      <Menu.Item
        name="All Images"
        active={activeItem === 'All Images'}
        onClick={() => {
          history.push(homeRoute);
          setActiveItem('All Images');
        }}
      />

      <Menu.Item
        name="All My Images"
        active={isAuthenticated && activeItem === 'All My Images'}
        onClick={() => {
          history.push(userImagesRoute(AuthService.getUser().id));
          setActiveItem('All My Images');
        }}
        disabled={!AuthService.isAuthenticated()}
      />

      <Grid container verticalAlign="middle" centered>
        <Grid.Row>
          <Menu.Item header>Shopify Image Repository</Menu.Item>
        </Grid.Row>
      </Grid>

      <Menu.Menu position="right">
        <Menu.Item
          name="Upload Images"
          active={isAuthenticated && activeItem === 'Upload Images'}
          onClick={() => {
            history.push(uploadImagesRoute);
            setActiveItem('Upload Images');
          }}
          disabled={!AuthService.isAuthenticated()}
        />

        <Menu.Item
          name="Delete Images"
          active={isAuthenticated && activeItem === 'Delete Images'}
          onClick={() => {
            history.push(userDeleteImagesRoute(AuthService.getUser().id));
            setActiveItem('Delete Images');
          }}
          disabled={!AuthService.isAuthenticated()}
        />
        <Menu.Item
          name={authString}
          active={activeItem === authString}
          onClick={() => {
            AuthService.authRouteHandler(history);
            setActiveItem(authString);
          }}
        />
      </Menu.Menu>
    </Menu>
  );
}
