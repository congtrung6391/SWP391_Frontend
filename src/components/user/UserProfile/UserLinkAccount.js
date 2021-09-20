import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  ListItemAvatar,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinkIcon from '@material-ui/icons/Link';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { getUserInformation, saveUser } from '../../../utils/cookies';
import { Loading } from '../../common/Loading';
import UserService from '../../../services/user.services';
import { ToastContext } from '../../../context/toast.context';

const UserLinkAccount = () => {
  const [isGoogleLoggingIn, setIsGoogleLoggingIn] = useState(false);
  const [isFacebookLoggingIn, setIsFacebookLoggingIn] = useState(false);
  const [connectedGoogle, setConnectedGoogle] = useState(false);
  const [connectedFacebook, setConnectedFacebook] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const toastContext = useContext(ToastContext);

  const GOOGLE_ID = process.env.REACT_APP_GOOGLE_LOGIN_ID;
  const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_LOGIN_ID;

  useEffect(() => {
    const currentUser = getUserInformation();
    setConnectedFacebook(currentUser.ConnectedFacebook);
    setConnectedGoogle(currentUser.ConnectedGoogle);
  }, []);

  useEffect(() => {
    if (message) {
      toastContext.addNotification('Thành công', message);
    }
    if (error) {
      toastContext.addNotification('Lỗi', error, 'error');
    }
  }, [error, message]);

  const saveUpdatedInfo = async (updateInfo) => {
    const currentUser = getUserInformation();
    if (updateInfo.ConnectedGoogle !== undefined) {
      currentUser.ConnectedGoogle = updateInfo.ConnectedGoogle;
      // console.log(currentUser);
    }
    if (updateInfo.ConnectedFacebook !== undefined) {
      currentUser.ConnectedFacebook = updateInfo.ConnectedFacebook;
    }
    saveUser(currentUser);
  };

  const successResponseGoogle = async (response) => {
    setIsGoogleLoggingIn(true);

    const { tokenId, googleId } = response;

    const responseAccount = await UserService.connectGoogle(getUserInformation('Id'), tokenId, googleId);
    if (responseAccount) {
      setError(responseAccount.includes('used') ? 'Gmail đã được liên kết với tài khoản khác' : 'Liên kết thất bại');
      setIsGoogleLoggingIn(false);
    } else {
      setMessage('Liên kết thành công');
      setIsGoogleLoggingIn(false);
      saveUpdatedInfo({
        ConnectedGoogle: true,
      });
      setConnectedGoogle(true);
    }
  };

  const disConnectGoogle = async () => {
    setIsGoogleLoggingIn(true);

    const responseAccount = await UserService.disconnectGoogle(getUserInformation('Id'));

    if (responseAccount) {
      setError(responseAccount.includes('used') ? 'Gmail đã được liên kết với tài khoản khác' : 'Hủy liên kết thất bại');
      setIsGoogleLoggingIn(false);
    } else {
      setIsGoogleLoggingIn(false);
      setMessage('Hủy liên kết thành công');
      saveUpdatedInfo({
        ConnectedGoogle: false,
      });
      setConnectedGoogle(false);
    }
  };

  const failureResponseGoogle = () => {
    // console.log(response);
  };

  const responseFacebook = async (response) => {
    const { accessToken, userID } = response;

    setIsFacebookLoggingIn(true);

    const responseAccount = await UserService.connectFacebook(getUserInformation('Id'), accessToken, userID);

    if (responseAccount) {
      setError(responseAccount.includes('used') ? 'Tài khoản Facebook đã được liên kết với tài khoản khác' : 'Liên kết thất bại');
      setIsFacebookLoggingIn(false);
    } else {
      setIsFacebookLoggingIn(false);
      setMessage('Liên kết thành công');
      saveUpdatedInfo({
        ConnectedFacebook: true,
      });
      setConnectedFacebook(true);
    }
  };

  const disConnectFacebook = async () => {
    setIsFacebookLoggingIn(true);

    const responseAccount = await UserService.disconnectFacebook(getUserInformation('Id'));

    if (responseAccount) {
      setError(responseAccount.includes('used') ? 'Tài khoản Facebook đã được liên kết với tài khoản khác' : 'Hủy liên kết thất bại');
      setIsFacebookLoggingIn(false);
    } else {
      setIsFacebookLoggingIn(true);
      setMessage('Hủy liên kết thành công');
      saveUpdatedInfo({
        ConnectedFacebook: false,
      });
      setConnectedFacebook(false);
    }
  };

  return (
    <Paper
      component={Box}
      mb={2}
      p={3}
      boxShadow={2}
    >
      {/** Connect social accounts */}

      {/** Title */}
      <Typography component={Box}>
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Liên kết tài khoản
        </Box>
      </Typography>
      <Box
        mx={1}
        mt={2}
      >
        <ListItem>
          <ListItemAvatar>
            <div
              className="social-login-button"
              style={{ height: '1.5rem', width: '1.5rem' }}
            >
              <img src="./image/logo/google.svg" alt="google-login" />
            </div>
          </ListItemAvatar>
          <ListItemText>
            {
              connectedGoogle
                ? 'Đã liên kết'
                : 'Chưa liên kết'
            }
          </ListItemText>
          <ListItemIcon>
            {
              connectedGoogle
                ? (
                  <button
                    type="button"
                    onClick={disConnectGoogle}
                    disabled={isGoogleLoggingIn}
                    className="social-login-button sm"
                  >
                    {
                      isGoogleLoggingIn
                        ? <div style={{ padding: '5px 0 5px 0' }}><Loading /></div>
                        : <DeleteForeverIcon color="error" />
                    }
                  </button>
                )
                : (
                  <GoogleLogin
                    clientId={GOOGLE_ID}
                    render={(renderProps) => (
                      <button
                        type="button"
                        onClick={() => { renderProps.onClick(); }}
                        disabled={renderProps.disabled}
                        className="social-login-button sm"
                      >
                        {
                          isGoogleLoggingIn
                            ? <div style={{ padding: '5px 0 5px 0' }}><Loading /></div>
                            : <LinkIcon />
                        }
                      </button>
                    )}
                    buttonText="Liên kết"
                    onSuccess={successResponseGoogle}
                    onFailure={failureResponseGoogle}
                    cookiePolicy="single_host_origin"
                  />
                )
            }
          </ListItemIcon>
        </ListItem>
        <ListItem className="hover-shadow">
          <ListItemAvatar>
            <div
              className="social-login-button sm"
              style={{ height: '1.5rem', width: '1.5rem' }}
            >
              <img src="./image/logo/facebook.svg" alt="facebook-login" />
            </div>
          </ListItemAvatar>
          <ListItemText>
            {
              connectedFacebook
                ? 'Đã liên kết'
                : 'Chưa liên kết'
                // : {user.FacebookId}
            }
          </ListItemText>
          <ListItemIcon>
            {
              connectedFacebook
                ? (
                  <button
                    type="button"
                    onClick={disConnectFacebook}
                    disabled={isFacebookLoggingIn}
                    className="social-login-button sm"
                  >
                    {
                      isFacebookLoggingIn
                        ? <div style={{ padding: '5px 0 5px 0' }}><Loading /></div>
                        : <DeleteForeverIcon color="error" />
                    }
                  </button>
                )
                : (
                  <FacebookLogin
                    appId={FACEBOOK_ID}
                    textButton=""
                    icon={
                      isFacebookLoggingIn
                        ? <div style={{ padding: '5px 0 5px 0' }}><Loading /></div>
                        : <LinkIcon />
                    }
                    cssClass="social-login-button sm"
                    fields="name,email,picture"
                    callback={responseFacebook}
                  />
                )
            }
          </ListItemIcon>
        </ListItem>
      </Box>
    </Paper>
  );
};

export default UserLinkAccount;
