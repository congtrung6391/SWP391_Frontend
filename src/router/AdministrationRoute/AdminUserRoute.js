import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserPage from '../../components/administrator/Users/UserPage';
import { AuthenticationContext } from '../../context/authentication.context';
import AdminUserProvider from '../../context/adminUser.context';

const AdminUserRoute = () => {
  const { verifySuperAdministrator } = useContext(AuthenticationContext);
  if (!verifySuperAdministrator()) {
    return <Redirect to="/" />;
  }

  return (
    <AdminUserProvider>
        <Switch>
            <Route exact path="/admin/users" component={UserPage} />
        </Switch>
    </AdminUserProvider>
  );
};

export default AdminUserRoute;
