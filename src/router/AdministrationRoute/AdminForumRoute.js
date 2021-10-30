import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authentication.context';
import ForumPage from '../../components/administrator/forum/ForumPage';
import AdminForumProvider from '../../context/adminForum.context';

const AdminForumRoute = () => {
  const { verifyAdministrator } = useContext(AuthenticationContext);
  if (!verifyAdministrator()) {
    return <Redirect to="/" />;
  }

  return (
    <AdminForumProvider>
        <Switch>
            <Route exact path="/admin/forum" component={ForumPage} />
        </Switch>
    </AdminForumProvider>
  );
};

export default AdminForumRoute;
