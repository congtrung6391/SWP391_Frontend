/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminUsersService from '../services/adminUsers.service';

export const AdminUserContext = React.createContext();

class AdminUserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      totalUsers: 0,
      getUserList: this.getUserList,
      changeUserRole: this.changeUserRole,
      deleteUser: this.deleteUser,
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  changeUserRole = async (role, username) => {
    const response = await AdminUsersService.changeUserRole(role, username);
    if (typeof response === 'string') {
      return response;
    }
    const { userList } = this.state;
    const index = userList.findIndex((user) => user.username === username);
    const newUser = userList[index];
    newUser.roles = [{
      userRole: role,
    }];
    userList.splice(index, 1, newUser);
    return null;
  }

  deleteUser = async (id) => {
    const response = await AdminUsersService.deleteUser(id);
    if (typeof response === 'string') {
      return response;
    }
    const { userList } = this.state;
    const index = userList.findIndex((user) => user.id === id);
    userList.splice(index, 1);
    return null;
  }

  getUserList = async (setting) => {
    const { userList } = this.state;
    if (userList.length === 0) {
      const { users: newUserList, totalUsers } = await AdminUsersService.getUserList(setting);
      this.setState({ userList: newUserList, totalUsers });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <AdminUserContext.Provider value={this.state}>
        { children }
      </AdminUserContext.Provider>
    );
  }
}

export default AdminUserProvider;
