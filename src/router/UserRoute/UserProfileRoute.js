import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile/UserProfile';
import SubmissionDetails from '../../components/common/Submission/SubmissionDetails';
import { AuthenticationContext } from '../../context/authentication.context';
import Page404 from '../../components/common/404';
import Certificate from '../../components/user/UserProfile/Certificate';

const UserProfileRoute = () => {
  const { verifyUser } = useContext(AuthenticationContext);
  if (!verifyUser()) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route exact path="/users/:uid" component={UserProfile} />
      <Route exact path="/users/:uid/:view" component={UserProfile} />
      <Route exact path="/users/:uid/submissions/:submissionId" component={SubmissionDetails} />
      <Route exact path="/users/:uid/certificates/:certId" component={Certificate} />
      <Route component={Page404} />
    </Switch>
  );
};

export default UserProfileRoute;
