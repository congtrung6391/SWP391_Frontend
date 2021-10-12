import React/* , { useContext, useState, useEffect } */ from 'react';
import validate from 'validate.js';
import { Redirect } from 'react-router-dom';

import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControlLabel,
  Avatar,
  Button,
  Link,
  RadioGroup,
  Radio,
} from '@mui/material';

// import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: 'STUDENT',
      errorFullname: '',
      errorUsername: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPassword: '',
      passwordStrength: 0,
      errorPhone: '',
      isRegistering: false,
    };
    // this.language = new LanguageService();
    // this.language.import(registerLanguage);
  }

  validateFullname = (fullname) => {
    if (!fullname) {
      this.setState(() => ({ errorFullname: 'Fullname can not be empty.'}));
    } else if (fullname.length > 50) {
      this.setState(() => ({ errorFullname: 'The length of Fullname cannot be greater than 50.' }));
    } else {
      this.setState(() => ({ errorFullname: '' }));
    }
  };

  validateUsername = (username) => {
    if (!username) {
      this.setState(() => ({ errorUsername: 'Username can not be empty.'}));
    } else if (username.includes(' ')) {
      this.setState(() => ({ errorUsername: 'Username cannot include white-space character.' }));
    } else if (username.length > 50) {
      this.setState(() => ({ errorUsername: 'The length of Username cannot be greater than 50.' }));
    } else {
      this.setState(() => ({ errorUsername: '' }));
    }
  };

  validateEmail = (email) => {
    if (!email) {
      this.setState(() => ({ errorEmail: 'Email cannot be empty.' }));
    } else {
      const constraint = {
        from: {
          email: true,
        },
      };

      if (validate({ from: email }, constraint) !== undefined) {
        this.setState(() => ({ errorEmail: 'Email is not valid.' }));
      } else {
        this.setState(() => ({ errorEmail: '' }));
      }
    }
  };

  validatePassword = (password) => {
    if (!password) {
      this.setState(() => ({ errorPassword: 'Password cannot be empty.', passwordStrength: 0 }));
    } else if (password.length < 8) {
      this.setState(() => ({ errorPassword: 'Password must have at least 8 characters.', passwordStrength: 0 }));
    } else {
      this.setState(() => ({ errorPassword: '' }));
      this.calculatePasswordStrength(password);
    }
  };

  validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) {
      this.setState(() => ({ errorConfirmPassword: 'Confirm password and Password are not the same.' }));
    } else {
      this.setState(() => ({ errorConfirmPassword: '' }));
    }
  };

  validatePhone = (phone) => {
    if (!phone) {
      this.setState(() => ({ errorPhone: 'Phone cannot be empty.' }));
    } else if (phone.length !== 10 || isNaN(parseInt(phone, 10))) {
      this.setState(() => ({ errorPhone: 'Invalid phone number' }));
    } else {
      this.setState(() => ({ errorPhone: '' }));
    }
  }

  validateRole = () => {
    const { role } = this.state;
    if (role === null) {
      this.setState(() => ({ errorRole: 'Please select your role' }));
    } else {
      this.setState(() => ({ errorRole: '' }));
    }
  }

  onChangeFullname = (fullname) => {
    this.setState(() => ({ fullname }));
    this.validateFullname(fullname);
  }

  onChangeUsername = (username) => {
    this.setState(() => ({ username }));
    this.validateUsername(username);
  };

  onChangeEmail = (email) => {
    email = email.toLowerCase();
    this.setState(() => ({ email }));
    this.validateEmail(email);
  };

  calculatePasswordStrength = (password) => {
    const regexLower = /[a-z]/g;
    const regexUpper = /[A-Z]/g;
    const regexNumber = /[0-9]/g;
    const regexSpecial = /[`~!@#$%^&*()_+{}|;:'",<.>?]/g;
    let passwordStrength = 0;

    if (password.match(regexLower)) {
      passwordStrength += 1;
    }
    if (password.match(regexUpper)) {
      passwordStrength += 1;
    }
    if (password.match(regexNumber)) {
      passwordStrength += 1;
    }
    if (password.match(regexSpecial)) {
      passwordStrength += 1;
    }

    this.setState(() => ({ passwordStrength }));
  };

  onChangePassword = (password) => {
    this.setState(() => ({ password }));
    this.validatePassword(password);
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState(() => ({ confirmPassword }));
    const { password } = this.state;
    this.validateConfirmPassword(password, confirmPassword);
  };

  onChangePhone = (phone) => {
    this.setState(() => ({ phone }));
    this.validatePhone(phone);
  }

  onChangeRole = (role) => {
    this.setState(() => ({ role }));
  }

  onFocusUsername = () => {
    const { fullname } = this.state;
    this.validateFullname(fullname);
  }

  onFocusEmail = () => {
    const { fullname } = this.state;
    this.validateFullname(fullname);
    const { username } = this.state;
    this.validateUsername(username);
  };

  onFocusPassword = () => {
    const { username, email, fullname } = this.state;
    this.validateUsername(username);
    this.validateEmail(email);
    this.validateFullname(fullname);
  };

  onFocusConfirmPassword = () => {
    const { username, email, password, fullname } = this.state;
    this.validateUsername(username);
    this.validateEmail(email);
    this.validatePassword(password);
    this.validateFullname(fullname);
  };

  onFocusPhone = () => {
    const { username, email, password, fullname } = this.state;
    this.validateUsername(username);
    this.validateEmail(email);
    this.validatePassword(password);
    this.validateFullname(fullname);
  }

  registerNewUser = async (event) => {
    const {
      fullname,
      username,
      email,
      password,
      confirmPassword,
      role, 
      phone,
      errorFullname,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
      errorPhone,
      errorRole,
    } = this.state;
    const { history } = this.props;
    event.preventDefault();
    this.validateFullname(fullname);
    this.validateUsername(username);
    this.validateEmail(email);
    this.validatePassword(password);
    this.validateConfirmPassword(password, confirmPassword);
    this.validatePhone(phone);
    this.validateRole();

    if (errorFullname
        || errorUsername
        || errorEmail
        || errorPassword
        || errorConfirmPassword
        || errorPhone
        || errorRole) {
      return;
    }

    this.setState(() => ({ isRegistering: true }));

    const response = await this.authenticationcContext.register(
      fullname,
      username,
      email,
      // SHA256(password).toString(),
      password,
      phone, 
      role,
    );

    // success
    if (!response || response === null) {
      history.push('/login');
      return;
    }

    // existed
    if (response.includes('taken') && response.includes('Username')) {
      this.setState({
        errorUsername: 'This username has already existed.',
      });
    }
    if (response.includes('taken') && response.includes('Email')) {
      this.setState({
        errorEmail: 'This Email has already existed.',
      });
    }
    
    this.setState(() => ({ isRegistering: false }));
  };

  render = () => {
    const {
      fullname,
      username,
      email,
      password,
      phone,
      role,
      errorFullname,
      confirmPassword,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
      passwordStrength,
      errorPhone, 
      errorRole,
      isRegistering,
    } = this.state;
    const { history } = this.props;

    return (
      <AuthenticationContext.Consumer>
        {(authenticationcContext) => {
          this.authenticationcContext = authenticationcContext;

          if (authenticationcContext.verifyUser()) {
            return (
              <Redirect to="/" />
            );
          }

          return (
            <>
              <NavigationBar
                nav={[
                  ['Home', '/'],
                  ['Register'],
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
                  <Box display="flex" flexDirection="column" mb={3}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        required
                        label="Fullname"
                        variant="outlined"
                        value={fullname || ''}
                        onChange={(event) => this.onChangeFullname(event.target.value)}
                        error={!!errorFullname}
                        helperText={errorFullname}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        required
                        label="Username"
                        variant="outlined"
                        value={username || ''}
                        onChange={(event) => this.onChangeUsername(event.target.value)}
                        onFocus={this.onFocusUsername}
                        error={!!errorUsername}
                        helperText={errorUsername}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        variant="outlined"
                        value={email || ''}
                        onChange={(event) => this.onChangeEmail(event.target.value)}
                        onFocus={this.onFocusEmail}
                        error={!!errorEmail}
                        helperText={errorEmail}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password || ''}
                        onChange={(event) => this.onChangePassword(event.target.value)}
                        onFocus={this.onFocusPassword}
                        error={!!errorPassword}
                        helperText={errorPassword}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        required
                        label="Comfirm password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword || ''}
                        onChange={(event) => this.onChangeConfirmPassword(event.target.value)}
                        onFocus={this.onFocusConfirmPassword}
                        error={!!errorConfirmPassword}
                        helperText={errorConfirmPassword}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Phone number"
                        variant="outlined"
                        value={phone || ''}
                        onChange={(event) => this.onChangePhone(event.target.value)}
                        onFocus={this.onFocusPhone}
                        error={!!errorPhone}
                        helperText={errorPhone}
                      />
                    </Box>
                    <Box>
                    <RadioGroup
                      aria-label="role"
                      defaultValue="STUDENT"
                      name="radio-buttons-group"
                      onChange={(event) => this.onChangeRole(event.target.value)}
                    >
                      <FormControlLabel value="STUDENT" control={<Radio color="primary" />} label="Student" />
                      <FormControlLabel value="TUTOR" control={<Radio color="primary" />} label="Tutor" />
                      <FormControlLabel value="ADMIN" control={<Radio color="primary" />} label="Admin" />
                      <FormControlLabel value="SUPER_ADMIN" control={<Radio color="primary" />} label="SuperAdmin" />
                    </RadioGroup>
                    </Box>
                  </Box>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={this.registerNewUser}
                    disabled={isRegistering}
                  >
                    {
                      isRegistering && <Loading />
                    }
                    &nbsp;
                    Register
                  </Button>
                  <Box mt={2} display="flex" flexDirection="row" justifyContent="center">
                    <Link href="/login" underline="none">Already have an account</Link>
                  </Box>
                </Box>
              </Body>
            </>
          );
        }}
      </AuthenticationContext.Consumer>
    );
  }
}

export default Register;
