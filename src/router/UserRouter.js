import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../components/user/HomePage';

const UserRoute = () => (
  <Switch>
    <Route path="/"><HomePage /></Route>
  </Switch>
);

export default UserRoute;