import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCoursePage from '../../components/administrator/course/AddCoursePage';
import CoursePage from '../../components/administrator/course/CoursePage';
import EditCoursePage from '../../components/administrator/course/EditCoursePage';
import AdminCourseProvider from '../../context/adminCourse.context';
import AdminCourseMaterialProvider from '../../context/adminCourseMaterial.context';
import AdminCourseStudentProvider from '../../context/AdminCourseStudent.context';
import AdminCourseTimetableProvider from '../../context/adminCourseTimetable.context';

const AdminUserRoute = () => {
  return (
    <AdminCourseProvider>
      <AdminCourseMaterialProvider>
        <AdminCourseTimetableProvider>
          <AdminCourseStudentProvider>
            <Switch>
                <Route path="/admin/courses/add" component={AddCoursePage} />
                <Route path="/admin/courses/edit/:id" component={EditCoursePage} />
                <Route path="/admin/courses" component={CoursePage} />
            </Switch>
          </AdminCourseStudentProvider>
        </AdminCourseTimetableProvider>
      </AdminCourseMaterialProvider>
    </AdminCourseProvider>
  );
};

export default AdminUserRoute;
