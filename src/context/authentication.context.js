/* eslint-disable react/no-unused-state */
import React from 'react';
import { getUserInformation, logOut, saveUser } from '../utils/cookies';
import AuthenticationService from '../services/authentication.service';

export const AuthenticationContext = React.createContext();

class AuthenticationProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      user: undefined,
      register: this.register,
      login: this.login,
      verifyToken: this.verifyToken,
      verifySuperAdministrator: this.verifySuperAdministrator,
      verifyAdministrator: this.verifyAdministrator,
      verifyTutor: this.verifyTutor,
      verifyUser: this.verifyUser,
      logout: this.logout,
    };
  }

  componentDidMount() {
    this.setState({
      user: getUserInformation(),
      ready: true,
    });
    this.verifyToken();
  }

  login = async (usernameOrEmail, password, isRemember) => {
    const response = await AuthenticationService.login(usernameOrEmail, password);
    if (typeof response === 'object') {
      this.setState({ user: response });
      this.setState({ ready: false });
      this.setState({ ready: true });
      saveUser(response, isRemember);
    } else {
      return response;
    }

    return null;
  }

  // eslint-disable-next-line no-return-await
  register = async (fullname, username, email, password, phone, role) => {
    const result = await AuthenticationService.register(fullname, username, email, password, phone, role);
    return result;
  }

  logout = async () => {
    logOut();
    this.setState({ user: undefined });
    // await this.setState({ ready: false });
    // await this.setState({ ready: true });
  }

  verifyToken = async () => {
    const response = await AuthenticationService.verifyToken();
    if (response) {
      this.logout();
    }
  }

  // eslint-disable-next-line react/destructuring-assignment
  verifyUser = () => !!this.state.user

  // eslint-disable-next-line react/destructuring-assignment
  verifyAdministrator = () => this.verifyUser() && ['ADMIN', 'SUPER_ADMIN'].includes(this.state.user.role)

  // eslint-disable-next-line react/destructuring-assignment
  verifySuperAdministrator = () => this.verifyUser() && ['SUPER_ADMIN'].includes(this.state.user.role)
  
  // eslint-disable-next-line react/destructuring-assignment
  verifyTutor = () => this.verifyUser() && ['TUTOR', 'ADMIN', 'SUPER_ADMIN'].includes(this.state.user.role)

  render() {
    const { ready } = this.state;
    const { children } = this.props;

    if (!ready) {
      return <div />;
    }

    return (
      <AuthenticationContext.Provider value={this.state}>
        { children }
      </AuthenticationContext.Provider>
    );
  }
}

export default AuthenticationProvider;
