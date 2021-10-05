/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Avatar, Button, Link,
} from '@mui/material';

import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      remember: true,
      wrongPassword: '',
      isLoggingIn: false,
    };
    this.context = AuthenticationContext;
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.history.push('/');
    }
  }

  toggleRemember = () => {
    const { remember } = this.state;
    if (remember) {
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
      await this.setState(() => ({ wrongPassword: 'Wrong username or password.' }));
      return;
    }

    this.setState(() => ({
      isLoggingIn: true,
    }));

    const response = await login(Username, Password, remember);
    if (response) {
      this.setState(() => ({
        wrongPassword: (response.includes('Invalid user') || response.includes('Bad credentials')) ? 'Wrong password or username.' : response,
        isLoggingIn: false,
      }));
    } else {
      // history.push('/');
    }
  }

  render = () => {
    const {
      Username,
      wrongPassword,
      Password,
      remember,
      isLoggingIn,
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
                  flexGrow={1}
                  sx={{ minWidth: '17rem', maxWidth: '25rem' }}
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
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={Username || ''}
                        onChange={(event) => this.onChangeUsername(event.target.value)}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={Password || ''}
                        onChange={(event) => this.onChangePassword(event.target.value)}
                        error={!!wrongPassword}
                        helperText={wrongPassword}
                      />
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={remember}
                            onChange={this.toggleRemember}
                          />
                        }
                        label="Remember me"
                        labelPlacement="end"
                      />
                    </Box>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth disabled={isLoggingIn}
                    onClick={this.onSubmitLogin}
                  >
                    {
                      isLoggingIn && <Loading />
                    }
                    &nbsp;
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
