import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserProfile from '../../components/user/UserProfile/UserProfile';
import EditUserProfile from '../../components/user/UserProfile/Edit/EditUserProfile';
import Page404 from '../../components/common/404';
import PublicCourse from '../../components/user/Course/PublicCoursePage';
import CourseProvider from '../../context/course.context';

const CourseRoute = () => {

  return (
    <CourseProvider>
      <Switch>
        <Route path="/courses" component={PublicCourse} />
        <Route component={Page404} />
      </Switch>
    </CourseProvider>
  );
};

export default CourseRoute;
