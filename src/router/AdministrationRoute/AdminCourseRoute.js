import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCoursePage from '../../components/administrator/course/AddCoursePage';
import CoursePage from '../../components/administrator/course/CoursePage';
import EditCoursePage from '../../components/administrator/course/EditCoursePage';
import AdminCourseProvider from '../../context/adminCourse.context';
import AdminCourseMaterialProvider from '../../context/adminCourseMaterial.context';

const AdminUserRoute = () => {
  return (
    <AdminCourseProvider>
      <AdminCourseMaterialProvider>
        <Switch>
            <Route path="/admin/courses/add" component={AddCoursePage} />
            <Route path="/admin/courses/edit/:id" component={EditCoursePage} />
            <Route path="/admin/courses" component={CoursePage} />
        </Switch>
      </AdminCourseMaterialProvider>
    </AdminCourseProvider>
  );
};

export default AdminUserRoute;
