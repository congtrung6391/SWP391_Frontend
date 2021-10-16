import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import UserProfile from '../../components/user/UserProfile/UserProfile';
import EditUserProfile from '../../components/user/UserProfile/Edit/EditUserProfile';
// import { AuthenticationContext } from '../../context/authentication.context';
import Page404 from '../../components/common/404';
import UserProfile from '../../components/user/UserProfile/View/UserProfile';
import UserProvider from '../../context/user.context';

const UserProfileRoute = () => {
  // const { verifyUser } = useContext(AuthenticationContext);
  // if (!verifyUser()) {
  //   return <Redirect to="/" />;
  // }
  return (
    <UserProvider>
      <Switch>
        <Route path="/users/:uid/edit" component={EditUserProfile} />
        <Route path="/users/:uid/profile" component={UserProfile} />
        <Route component={Page404} />
      </Switch>
    </UserProvider>
  );
};

export default UserProfileRoute;
