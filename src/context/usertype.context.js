/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminUsersService from '../services/adminUsers.service';

export const UserTypeContext = React.createContext();

class UserTypeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usertypes: [],
      getUserTypes: this.getUsertypes,
    };
  }

  componentDidMount() {
    this.getUsertypes();
  }

  getUsertypes = async () => {
    const { usertypes } = this.state;
    if (usertypes.length === 0) {
      const newUsertypes = await AdminUsersService.getUserTypes();
      this.setState({ usertypes: newUsertypes });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <UserTypeContext.Provider value={this.state}>
        { children }
      </UserTypeContext.Provider>
    );
  }
}

export default UserTypeProvider;
