import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TutorPage from '../../components/user/Tutor/TutorPage';
import UserProvider from '../../context/user.context';

const TutorRoute = () => {
  return (
    <UserProvider>
      <Switch>
          <Route exact path="/tutors" component={TutorPage} />
      </Switch>
    </UserProvider>
  );
};

export default TutorRoute;
