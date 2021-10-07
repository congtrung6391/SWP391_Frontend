import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/administrator/Dashboard/Dashboard';
import ToastProvider from '../context/toast.context';
import UserPage from '../components/administrator/Users/UserPage';
import { AuthenticationContext } from '../context/authentication.context';
import AdminUserProvider from '../context/adminUser.context';

const AdministratorRoute = () => {
  const { verifyTutor } = useContext(AuthenticationContext);
  if (!verifyTutor()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="d-flex">
      <div style={{ width: '100%' }}>
        <ToastProvider>
          <AdminUserProvider>
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route exact path="/admin/users" component={UserPage} />
            </Switch>
          </AdminUserProvider>
        </ToastProvider>
      </div>
    </div>
  );
};

export default AdministratorRoute;
