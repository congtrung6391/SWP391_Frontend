import React from 'react';
import {
  Box, Paper, TextField, Typography, Button, styled,
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

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: '',
      error: '',
      isSending: false,
    };
  }

  componentDidMount = () => {
    if (isLoggedIn()) {
      history.push('/');
    }
  };

  onChangeUsernameEmail = async (event) => {
    const emailOrUsername = event.target.value;
    await this.setState(() => ({ emailOrUsername }));
  };

  onSendResetEmail = async (event) => {
    event.preventDefault();
    const { emailOrUsername } = this.state;

    if (emailOrUsername.trim().length === 0) {
      return;
    }

    try {
      await this.setState(() => ({ isSending: true }));
      const forgotPasswordApi = new APIService('post', `${BASE}auth/send-forgot-password?email=${emailOrUsername}`);
      await forgotPasswordApi.request();
      history.push('/reset');
    } catch (error) {
      this.setState(() => ({ error: 'Request failed' }));
    }
    this.setState(() => ({ isSending: false }));
  };

  render = () => {
    const { emailOrUsername, error, isSending } = this.state;
    return (
      <div>
        <NavigationBar
          nav={[
            ['home', '/'],
            ['login', '/login'],
            ['Forget password'],
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
            <Typography variant="h5">Reset password</Typography>
            <Box
              display="flex"
              flexDirection="column"
              component="form"
              onSubmit={this.onSendResetEmail}
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
                  id="sendreset-input"
                  label="Email"
                  variant="outlined"
                  value={emailOrUsername}
                  onChange={this.onChangeUsernameEmail}
                  helperText={error || 'Reset code will be sent to your email'}
                  error={!!error}
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
                  disabled={isSending}
                  className="w-50"
                >
                  <div style={{ fontSize: '18px' }}>
                    {isSending ? <div className="py-1"><Loading /></div> : 'Xác nhận'}
                  </div>
                </ResetButton>
              </Box>
            </Box>
          </Box>
        </Body>
      </div>
    );
  }
}

export default ForgotPassword;
