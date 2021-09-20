import React, { useContext, useEffect, useState } from 'react';
import {
  Box, withStyles, Paper, TextField, Typography, Button, useTheme,
} from '@material-ui/core';
import SHA256 from 'crypto-js/sha256';
import { getUserInformation, saveUser } from '../../../utils/cookies';
import { APIService } from '../../../services/api.service';
import { Loading } from '../../common/Loading';
import { ToastContext } from '../../../context/toast.context';

const CustomMuiInput = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.start.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.start.main,
        boxShadow: '1px 1px 20px -7px rgba(0, 0, 0, 0.4)',
      },
    },
  },
}))(TextField);

const UserPassword = () => {
  const theme = useTheme();
  const [password, setPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [resetPassword, setResetPassword] = useState();
  const [errorResetPassword, setErrorResetPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();
  const [passwordStrength, setPasswordStrength] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (message) {
      toastContext.addNotification('Thành công', message);
    }
    if (error) {
      toastContext.addNotification('Lỗi', error, 'error');
    }
  }, [message, error]);

  const calculatePasswordStrength = (pw) => {
    const regexLower = /[a-z]/g;
    const regexUpper = /[A-Z]/g;
    const regexNumber = /[0-9]/g;
    const regexSpecial = /[`~!@#$%^&*()_+{}|;:'",<.>?]/g;
    let newPasswordStrength = 0;

    if (pw.match(regexLower)) {
      newPasswordStrength += 1;
    }
    if (pw.match(regexUpper)) {
      newPasswordStrength += 1;
    }
    if (pw.match(regexNumber)) {
      newPasswordStrength += 1;
    }
    if (pw.match(regexSpecial)) {
      newPasswordStrength += 1;
    }

    setPasswordStrength(newPasswordStrength);
  };

  const validateConfirmPassword = () => {
    if ((!resetPassword && !confirmPassword)
        || (resetPassword === confirmPassword)) {
      setErrorConfirmPassword('');
      return;
    }
    setErrorConfirmPassword('Xác nhận mật khẩu mới không chính xác');
  };
  useEffect(validateConfirmPassword, [confirmPassword]);

  const validateNewPassword = () => {
    setPasswordStrength(0);

    if (resetPassword && resetPassword.length < 8) {
      setErrorResetPassword('Mật khẩu mới phải có ít nhất 8 ký tự');
    } else if (!resetPassword) {
      setErrorResetPassword('');
    } else if (resetPassword && resetPassword.length >= 8) {
      setErrorResetPassword('');
      setErrorConfirmPassword('');
      calculatePasswordStrength(resetPassword);
    }
    validateConfirmPassword();
  };
  useEffect(validateNewPassword, [resetPassword]);

  const onChangeCurrentPassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrorPassword('');
  };

  const onChangeNewPassword = (event) => {
    const newPassword = event.target.value;
    setResetPassword(newPassword);
    setErrorResetPassword('');
  };

  const onChangeConfirmPassword = (event) => {
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);
    setErrorConfirmPassword('');
  };

  const resetPasswordField = () => {
    setPassword('');
    setErrorPassword('');
    setResetPassword('');
    setErrorResetPassword('');
    setConfirmPassword('');
    setErrorConfirmPassword('');
    setPasswordStrength('');
  };

  const onSavePassword = async (event) => {
    event.preventDefault();
    const currentUser = getUserInformation();

    // pre-check
    if (errorPassword || errorResetPassword || errorConfirmPassword) {
      return;
    }
    if (password && !resetPassword) {
      setErrorResetPassword('Bạn phải nhập mật khẩu mới để thay đổi mật khẩu');
      return;
    }
    if (resetPassword && !password && currentUser.UpdatedPassword) {
      setErrorPassword('Bạn phải nhập mật khẩu hiện tại để thay đổi mật khẩu');
      return;
    }

    // packing update data
    const updateInfo = {};
    if (resetPassword) {
      if (currentUser.UpdatedPassword) {
        updateInfo.Password = SHA256(password).toString();
      }
      updateInfo.resetPassword = SHA256(resetPassword).toString();
    }
    if (resetPassword && !password) {
      updateInfo.UpdatedPassword = true;
    }

    // Fetch API to save in server
    try {
      if (Object.keys(updateInfo).length > 0) {
        setIsSaving(true);
        await new APIService(
          'put',
          `users/${getUserInformation('Id')}`,
          null,
          updateInfo,
          true,
        ).request();
        // Save to local
        if (updateInfo.UpdatedPassword) {
          currentUser.UpdatedPassword = updateInfo.UpdatedPassword;
        }
        currentUser.Password = password;
        saveUser(currentUser);
        resetPasswordField();
        setMessage('Thay đổi mật khẩu thành công');
        setIsSaving(false);
      }
    } catch (err) {
      if (!err.message) return;
      const msg = err.message.toLowerCase();
      if (msg.includes('password')) {
        if (msg.includes('invalid')) {
          setErrorPassword('Sai mật khẩu');
        } else if (msg.includes('missing')) {
          setErrorPassword('Bạn chưa nhập mật khẩu hiện tại');
        }
      }
      if (msg.includes('deny')) {
        setError('Cập nhập tài khoản bị từ chối');
      }
      setIsSaving(false);
    }
  };

  return (
    <Paper
      component={Box}
      mb={2}
      p={3}
      boxShadow={2}
    >
      <Typography component={Box}>
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Đổi mật khẩu
        </Box>
      </Typography>
      <Box
        component="form"
        autoComplete="new-password"
        mx={1}
        mt={2}
        onSubmit={onSavePassword}
      >
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            autoComplete="new-password"
            label="Mật khẩu hiện tại"
            variant="outlined"
            type="password"
            value={password || ''}
            onChange={onChangeCurrentPassword}
            error={!!errorPassword}
            helperText={errorPassword || 'Nếu bạn đăng ký với Google/Facebook thì thay đổi password lần đầu không yêu cầu nhập phần này'}
          />
        </Box>
        <Box mt={2}>
          <CustomMuiInput
            fullWidth
            autoComplete="new-password"
            label="Mật khẩu mới"
            variant="outlined"
            type="password"
            value={resetPassword || ''}
            onChange={onChangeNewPassword}
            error={!!errorResetPassword}
            helperText={errorResetPassword}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          mb={2}
          display="flex"
          justifyContent="start"
        >
          <Box display="flex" flexDirection="column" className={`${passwordStrength > 0 && 'very-weak-password'}`} />
          <Box display="flex" flexDirection="column" className={`${passwordStrength > 1 && 'weak-password'}`} />
          <Box display="flex" flexDirection="column" className={`${passwordStrength > 2 && 'medium-password'}`} />
          <Box display="flex" flexDirection="column" className={`${passwordStrength > 3 && 'strong-password'}`} />
        </Box>
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            autoComplete="new-password"
            label="Xác nhận mật khẩu"
            variant="outlined"
            type="password"
            value={confirmPassword || ''}
            onChange={onChangeConfirmPassword}
            error={!!errorConfirmPassword}
            helperText={errorConfirmPassword}
          />
        </Box>
        <Box mt={2}>
          <Button
            disabled={!!isSaving}
            variant="contained"
            type="submit"
            onClick={onSavePassword}
            style={{
              color: theme.palette.start.contrastText,
              backgroundColor: theme.palette.start.main,
              '&:hover': {
                backgroundColor: theme.palette.start.dark,
              },
            }}
          >
            {
              isSaving
                ? <Loading />
                : 'Lưu'
            }
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserPassword;
