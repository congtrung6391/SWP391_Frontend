/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Avatar, Button, Link,
} from '@material-ui/core';

import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';
import history from '../../../BrowserHistory';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      remember: '',
      wrongPassword: '',
      isLoggingIn: false,
      isGoolgeLoggingIn: false,
      isFacebookLoggingIn: false,
      socialLoginError: '',
    };
    this.context = AuthenticationContext;
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push('/');
    }
  }

  toggleRemember = (value) => {
    const { remember } = this.state;
    if (remember === value) {
      this.setState(() => ({
        remember: '',
      }));
    } else {
      this.setState(() => ({
        remember: 'remember',
      }));
    }
  };

  resetWrongPassword = () => {
    const { wrongPassword } = this.state;
    if (wrongPassword) {
      this.setState(() => ({
        wrongPassword: '',
      }));
    }
  };

  onChangeUsername = (Username) => {
    this.setState(() => ({
      Username,
    }));

    this.resetWrongPassword();
  };

  onChangePassword = (Password) => {
    this.setState(() => ({
      Password,
    }));

    this.resetWrongPassword();
  }

  onSubmitLogin = async (event) => {
    event.preventDefault();
    const { Username, Password, remember } = this.state;
    const { login } = this.context;
    if (Username.trim().length === 0 || Password.length === 0) {
      await this.setState(() => ({ wrongPassword: 'Sai tên đăng nhập hoặc mật khẩu.' }));
      return;
    }

    this.setState(() => ({
      isLoggingIn: true,
    }));

    const response = await login(Username, Password, remember);
    if (response) {
      this.setState(() => ({
        wrongPassword: response.includes('Invalid user') ? 'Sai tên đăng nhập hoặc mật khẩu.' : response,
        isLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  successResponseGoogle = async (googleResponse) => {
    const { tokenId, googleId } = googleResponse;
    const { googleLogin } = this.context;

    this.setState(() => ({
      isGoolgeLoggingIn: true,
    }));

    const response = await googleLogin(tokenId, googleId);
    if (response) {
      this.setState(() => ({
        socialLoginError: response.includes('duplicate') ? 'Tài khoản đã tồn tại' : 'Đăng nhập thất bại',
        isGoolgeLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  failureResponseGoogle = () => {
    // console.log(response);
  }

  responseFacebook = async (response) => {
    const { accessToken, userID } = response;
    const { facebookLogin } = this.context;

    this.setState(() => ({
      isFacebookLoggingIn: true,
    }));

    const responseAccount = await facebookLogin(accessToken, userID);

    if (responseAccount) {
      this.setState(() => ({
        socialLoginError: responseAccount.includes('duplicate') ? 'Tài khoản đã tồn tại' : 'Đăng nhập thất bại',
        isFacebookLoggingIn: false,
      }));
    } else {
      history.goBack();
    }
  }

  render = () => {
    const {
      Username,
      wrongPassword,
      Password,
      remember,
      errorUsername,
      isLoggingIn,
      socialLoginError,
    } = this.state;

    return (
      <AuthenticationContext.Consumer>
        {
        (context) => {
          this.context = context;

          if (context.verifyUser()) {
            return <Redirect to="/" />;
          }

          return (
            <div>
              <NavigationBar
                nav={[
                  ['Home', '/'],
                  ['Login'],
                ]}
              />
              <Body>
                <Box
                  component={Paper}
                  elevation={3}
                  p={3}
                  sx={{ minWidth: '25rem' }}
                >
                  <Box mb={2} display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src="logo.png"
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <Typography variant="h6" color="primary">
                      Online Tutor
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" mb={1}>
                    <Box mb={1}>
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                      />
                    </Box>
                    <Box mb={1}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label="Remember me"
                        labelPlacement="end"
                      />
                    </Box>
                  </Box>
                  <Button color="primary" variant="contained" fullWidth>
                    Login
                  </Button>
                  <Box mt={2} display="flex" flexDirection="row" justifyContent="space-between">
                    <Link href="/forget-password" underline="none">Reset passwored</Link>
                    <Link href="/register" underline="none">Create new account</Link>
                  </Box>
                </Box>
              </Body>
            </div>
          );
        }
      }
      </AuthenticationContext.Consumer>
    );
  }
}

export default Login;
