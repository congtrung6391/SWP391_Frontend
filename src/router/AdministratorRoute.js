import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/administrator/Dashboard/Dashboard';
import ToastProvider from '../context/toast.context';
import { AuthenticationContext } from '../context/authentication.context';
import AdminUserRoute from './AdministrationRoute/AdminUserRoute';
import AdminCourseRoute from './AdministrationRoute/AdminCourseRoute';

const AdministratorRoute = () => {
  // const { verifyTutor } = useContext(AuthenticationContext);
  // if (!verifyTutor()) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="d-flex">
      <div style={{ width: '100%' }}>
        <ToastProvider>
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/admin/users" component={AdminUserRoute} />
            <Route path = "/admin/courses" component={AdminCourseRoute} />
          </Switch>
        </ToastProvider>
      </div>
    </div>
  );
};

export default AdministratorRoute;
