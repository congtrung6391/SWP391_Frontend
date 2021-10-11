import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../../components/common/404';
import PublicCourse from '../../components/user/Course/PublicCourse';
import CourseProvider from '../../context/course.context';
import PublicCoursePage from '../../components/user/Course/PublicCoursePage';

const CourseRoute = () => {

  return (
    <CourseProvider>
      <Switch>
        <Route path="/courses/:cid" component={PublicCoursePage} />
        <Route path="/courses" component={PublicCourse} />
        <Route component={Page404} />
      </Switch>
    </CourseProvider>
  );
};

export default CourseRoute;
