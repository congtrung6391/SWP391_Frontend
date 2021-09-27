import React/* , { useContext, useState, useEffect } */ from 'react';
import SHA256 from 'crypto-js/sha256';
import validate from 'validate.js';
import { Redirect } from 'react-router-dom';

import {
  Box, Typography, Paper, TextField, Checkbox, FormControlLabel, Avatar, Button, Link, RadioGroup, Radio,
} from '@material-ui/core';

// import { isLoggedIn } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
// import AuthenticationService from '../../../services/authentication.service';
import LanguageService from '../../../services/language.service';
import registerLanguage from './register.lang';
import { LanguageContext } from '../../../context/language.context';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import { AuthenticationContext } from '../../../context/authentication.context';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: '',
      Email: '',
      Password: '',
      confirmPassword: '',
      errorUsername: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirmPassword: '',
      passwordStrength: 0,
      isRegistering: false,
    };
    this.language = new LanguageService();
    this.language.import(registerLanguage);
  }

  validateUsername = (username) => {
    if (!username) {
      this.setState(() => ({ errorUsername: this.language.get('Username can not be empty.') }));
    } else if (username.includes(' ')) {
      this.setState(() => ({ errorUsername: 'Tên đăng nhập không được chứa khoảng trắng' }));
    } else {
      this.setState(() => ({ errorUsername: '' }));
    }
  };

  validateEmail = (email) => {
    if (!email) {
      this.setState(() => ({ errorEmail: 'Email không được để trống.' }));
    } else {
      const constraint = {
        from: {
          email: true,
        },
      };

      if (validate({ from: email }, constraint) !== undefined) {
        this.setState(() => ({ errorEmail: 'Email không hợp lệ.' }));
      } else {
        this.setState(() => ({ errorEmail: '' }));
      }
    }
  };

  validatePassword = (password) => {
    if (!password) {
      this.setState(() => ({ errorPassword: 'Mật khẩu không được để trống.', passwordStrength: 0 }));
    } else if (password.length < 8) {
      this.setState(() => ({ errorPassword: 'Mật khẩu phải chứa ít nhất 8 ký tự.', passwordStrength: 0 }));
    } else {
      this.setState(() => ({ errorPassword: '' }));
      this.calculatePasswordStrength(password);
    }
  };

  validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword !== password) {
      this.setState(() => ({ errorConfirmPassword: 'Mật khẩu xác nhận phải giống mật khẩu.' }));
    } else {
      this.setState(() => ({ errorConfirmPassword: '' }));
    }
  };

  onChangeUsername = (Username) => {
    this.setState(() => ({ Username }));
    this.validateUsername(Username);
  };

  onChangeEmail = (Email) => {
    this.setState(() => ({ Email }));
    this.validateEmail(Email);
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

  onChangePassword = (Password) => {
    this.setState(() => ({ Password }));
    this.validatePassword(Password);
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState(() => ({ confirmPassword }));
    const { Password } = this.state;
    this.validateConfirmPassword(Password, confirmPassword);
  };

  onFocusEmail = () => {
    const { Username } = this.state;
    this.validateUsername(Username);
  };

  onFocusPassword = () => {
    const { Username, Email } = this.state;
    this.validateUsername(Username);
    this.validateEmail(Email);
  };

  onFocusConfirmPassword = () => {
    const { Username, Email, Password } = this.state;
    this.validateUsername(Username);
    this.validateEmail(Email);
    this.validatePassword(Password);
  };

  registerNewUser = async (event) => {
    const {
      Username,
      Email,
      Password,
      confirmPassword,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
    } = this.state;
    const { history } = this.props;
    event.preventDefault();
    this.validateUsername(Username);
    this.validateEmail(Email);
    this.validatePassword(Password);
    this.validateConfirmPassword(Password, confirmPassword);

    if (errorUsername || errorEmail
        || errorPassword || errorConfirmPassword) {
      return;
    }

    this.setState(() => ({ isRegistering: true }));
    const response = await this.authenticationcContext.register(
      Username,
      Email,
      SHA256(Password).toString(),
    );

    if (!response || response === null) {
      history.push('/login');
    }

    if (response.includes('exists')) {
      this.setState({
        errorUsername: 'Tên đăng nhập hoặc email đã tồn tại.',
      });
    }
    // if (response === 'Username already exists.') {
    //   this.setState(() => ({
    //     errorUsername: 'Tên đăng nhập đã tồn tại.'
    //   }));
    // }
    // else if (response === 'Email already exists.') {
    //   this.setState(() => ({
    //     errorEmail: 'Email đã tồn tại.'
    //   }));
    // }
    this.setState(() => ({ isRegistering: false }));
  };

  render = () => {
    const {
      Username,
      Email,
      Password,
      confirmPassword,
      errorUsername,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
      passwordStrength,
      isRegistering,
      isGoolgeLoggingIn,
      isFacebookLoggingIn,
      socialLoginError,
    } = this.state;
    const { history } = this.props;

    return (
      <LanguageContext.Consumer>
        {
        (languageContext) => {
          this.language.use(languageContext.language);

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
                              required
                              label="Fullname"
                              variant="outlined"
                            />
                          </Box>
                          <Box mb={1}>
                            <TextField
                              fullWidth
                              required
                              label="Username"
                              variant="outlined"
                            />
                          </Box>
                          <Box mb={1}>
                            <TextField
                              fullWidth
                              required
                              label="Email"
                              variant="outlined"
                            />
                          </Box>
                          <Box mb={1}>
                            <TextField
                              fullWidth
                              required
                              label="Password"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                          <Box mb={1}>
                            <TextField
                              fullWidth
                              required
                              label="Comfirm password"
                              type="password"
                              variant="outlined"
                            />
                          </Box>
                          <Box mb={1}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Phone number"
                              variant="outlined"
                            />
                          </Box>
                          <Box>
                          <RadioGroup
                            aria-label="role"
                            defaultValue="student"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel value="student" control={<Radio color="primary" />} label="Student" />
                            <FormControlLabel value="tutor" control={<Radio color="primary" />} label="Tutor" />
                          </RadioGroup>
                          </Box>
                        </Box>
                        <Button color="primary" variant="contained" fullWidth>
                          Register
                        </Button>
                        <Box mt={2} display="flex" flexDirection="row" justifyContent="center">
                          <Link href="/register" underline="none">Already have an account</Link>
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
      </LanguageContext.Consumer>
    );
  }
}

export default Register;
