/* eslint-disable react/no-unused-state */
import React from 'react';
import UsersService from '../services/user.service';

export const UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      totalUsers: 0,
      limit: 2,
      getTutorList: this.getTutorList,
      getUserProfile: this.getUserProfile,
    };
  }

  getTutorList = async (setting) => {
    const { limit } = this.state;
    const list = await UsersService.getTutorList({ ...setting, limit });
    await this.setState({
      userList: list.userList,
      totalUsers: list.totalUsers,
    });
    return list;
  }

  getUserProfile = async (id) => {
    const user = await UsersService.getUserProfile(id);
    return user;
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={this.state}>
        { children }
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
