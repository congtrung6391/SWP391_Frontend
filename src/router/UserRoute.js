import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/user/Login/Login';
import Register from '../components/user/Register/Register';
import ForgotPassword from '../components/user/ForgotAndResetPassword/ForgotPassword';
import ResetPassword from '../components/user/ForgotAndResetPassword/ResetPassword';
import UserProfileRoute from './UserRoute/UserProfileRoute';

import Page404 from '../components/common/404';

import ToastProvider from '../context/toast.context';
import CourseRoute from './UserRoute/CourseRoute';


const UserRoute = () => (
  <ToastProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget-password" component={ForgotPassword} />
      <Route exact path="/reset" component={ResetPassword} />
      <Route path="/courses" component={CourseRoute} />
      <Route path="/users" component={UserProfileRoute} />
      <Route component={Page404} />
    </Switch>
  </ToastProvider>
);

export default UserRoute;
