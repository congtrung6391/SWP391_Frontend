import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile/UserProfile';
import EditUserProfile from '../../components/user/UserProfile/Edit/EditUserProfile';
import { AuthenticationContext } from '../../context/authentication.context';
import Page404 from '../../components/common/404';

const UserProfileRoute = () => {
  const { verifyUser } = useContext(AuthenticationContext);
  if (!verifyUser()) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route path="/users/:uid/edit" component={EditUserProfile} />
      <Route path="/users/:uid" component={UserProfile} />
      <Route component={Page404} />
    </Switch>
  );
};

export default UserProfileRoute;
