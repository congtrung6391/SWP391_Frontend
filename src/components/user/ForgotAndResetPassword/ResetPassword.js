import React from 'react';
import {
  Container, Box, Typography, Button, TextField, Paper, styled,
} from '@mui/material';
import { isLoggedIn } from '../../../utils/cookies';
import history from '../../../BrowserHistory';

import Body from '../../basic/Body';
import { Loading } from '../../common/Loading';
import { APIService } from '../../../services/api.service';
import { BASE } from '../../../config/route';
import NavigationBar from '../../common/NavigationBar';

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.start.contrastText,
  backgroundColor: theme.palette.start.main,
  '&:hover': {
    backgroundColor: theme.palette.start.dark,
  },
}));

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      resetCode: undefined,
      newPassword: '',
      confirmPassword: '',
      passwordStrength: 0,
      isSending: false,
      isPasswordValid: false,
      errorUsername: '',
      errorResetCode: '',
      errorNewPassword: '',
      errorConfirmPassword: '',
    };
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      history.push('/');
    }
  };

  // onChangeUsername = async (username) => {
  //   await this.setState(() => ({ username }));
  //   this.verifyUsername();
  // };

  // verifyUsername = async () => {
  //   if (this.state.username.trim().length === 0) {
  //     await this.setState(() => ({ errorUsername: 'Username can not be empty.' }));
  //   }
  //   else {
  //     await this.setState(() => ({ errorUsername: '' }));
  //   }
  // };

  onChangeResetCode = async (event) => {
    const resetCode = event.target.value;
    await this.setState(() => ({ resetCode }));
    this.verifyResetCode();
  };

  verifyResetCode = async () => {
    const { resetCode } = this.state;
    if (resetCode.trim().length === 0) {
      await this.setState(() => ({ errorResetCode: 'Reset code can not be empty.' }));
    } else {
      await this.setState(() => ({ errorResetCode: '' }));
    }
  };

  onChangeNewPassword = async (event) => {
    const newPassword = event.target.value;
    await this.setState(() => ({ newPassword }));
    this.verifyNewPassword();
  };

  verifyNewPassword = async () => {
    if (this.state.newPassword.length === 0) {
      await this.setState(() => ({
        errorNewPassword: 'New password can not be empty.',
        passwordStrength: 0,
        isPasswordValid: false,
      }));
    } else if (this.state.newPassword.length < 8) {
      await this.setState(() => ({
        errorNewPassword: 'Password must have at least 8 characters.',
        passwordStrength: 0,
        isPasswordValid: false,
      }));
    } else {
      await this.setState(() => ({
        errorNewPassword: '',
        isPasswordValid: true,
      }));
      this.calculatePasswordStrength(this.state.newPassword);
    }

    if (this.state.newPassword !== this.state.confirmPassword) {
      await this.setState(() => ({
        errorConfirmPassword: 'Confirm password must be the same as new password.',
        isPasswordValid: false,
      }));
    } else {
      await this.setState(() => ({
        errorConfirmPassword: '',
        isPasswordValid: true,
      }));
    }
  };

  calculatePasswordStrength = async (password) => {
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

    await this.setState(() => ({ passwordStrength }));
  };

  onChangeConfirmPassword = async (event) => {
    const confirmPassword = event.target.value;
    await this.setState(() => ({ confirmPassword }));
    this.verifyConfirmPassword();
  };

  verifyConfirmPassword = async () => {
    if (this.state.confirmPassword !== this.state.newPassword) {
      await this.setState(() => ({
        errorConfirmPassword: 'Confirm password must be the same as new password.',
        isPasswordValid: false,
      }));
    } else {
      await this.setState(() => ({
        errorConfirmPassword: '',
        isPasswordValid: true,
      }));
    }
  };

  onResetPassword = async (event) => {
    event.preventDefault();
    await this.verifyResetCode();
    await this.verifyNewPassword();
    await this.verifyConfirmPassword();

    const {
      errorUsername,
      errorResetCode,
      errorNewPassword,
      errorConfirmPassword,
      resetCode,
      newPassword,
    } = this.state;

    if (errorUsername || errorResetCode || errorNewPassword || errorConfirmPassword) {
      return;
    }

    await this.setState(() => ({ isSending: true }));

    try {
      const resetObject = {
        resetCode: resetCode,
        newPassword: newPassword,
      };

      const resetApi = new APIService('post', `${BASE}auth/reset-password`, null, resetObject);
      await resetApi.request();
      history.push('/login');
    } catch (error) {
      if (error.message === 'Reset password token mismatch') {
        this.setState(() => ({ errorResetCode: 'Wrong reset code' }));
      } else if (error.message.includes('username')) {
        this.setState(() => ({ errorUsername: error.message }));
      }
    }

    this.setState(() => ({ isSending: false }));
  };

  render = () => (
    <div>
      <NavigationBar nav={[]} />
      <Body>
        <Container>
          <Box display="flex" justifyContent="center">
            <Paper
              component={Box}
              display="flex"
              flexDirection="column"
              boxShadow={2}
              m={4}
              px={4}
              py={2}
              style={{ backgroundColor: 'white', minWidth: '30rem' }}
            >
              <Typography variant="h4">Reset password</Typography>
              <Box
                display="flex"
                flexDirection="column"
                component="form"
                onSubmit={this.onResetPassword}
                autoComplete="off"
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
              >
                <Box
                  mt={3}
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    id="resetcode-input"
                    label="Reset code"
                    variant="outlined"
                    value={this.state.resetCode || ''}
                    onChange={this.onChangeResetCode}
                    helperText={this.state.errorResetCode || 'Reset code is sent to your email'}
                    error={!!this.state.errorResetCode}
                  />
                </Box>
                <Box
                  mt={2}
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    autoComplete="new-password"
                    label="New password"
                    name="New password"
                    variant="outlined"
                    value={this.state.newPassword || ''}
                    type="password"
                    onChange={this.onChangeNewPassword}
                    helperText={this.state.errorNewPassword}
                    error={!!this.state.errorNewPassword}
                  />
                </Box>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                  display="flex"
                  justifyContent="start"
                >
                  <Box display="flex" flexDirection="column" className={`${this.state.passwordStrength > 0 && 'very-weak-password'}`} />
                  <Box display="flex" flexDirection="column" className={`${this.state.passwordStrength > 1 && 'weak-password'}`} />
                  <Box display="flex" flexDirection="column" className={`${this.state.passwordStrength > 2 && 'medium-password'}`} />
                  <Box display="flex" flexDirection="column" className={`${this.state.passwordStrength > 3 && 'strong-password'}`} />
                </Box>
                <Box
                  mt={2}
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <TextField
                    required
                    fullWidth
                    label="Confirm password"
                    name="Confirm password"
                    variant="outlined"
                    value={this.state.confirmPassword || ''}
                    type="password"
                    onChange={this.onChangeConfirmPassword}
                    helperText={this.state.errorConfirmPassword}
                    error={!!this.state.errorConfirmPassword}
                  />
                </Box>
                <Box
                  mt={3}
                  mb={3}
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                  }}
                >
                  <ResetButton
                    variant="contained"
                    type="submit"
                    disabled={this.state.isSending || !this.state.isPasswordValid}
                    className="w-100"
                  >
                    {this.state.isSending ? <Loading /> : 'Reset password'}
                  </ResetButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Body>
    </div>
  )
}

export default ResetPassword;
