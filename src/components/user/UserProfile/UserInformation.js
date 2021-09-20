import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  withStyles,
  Paper,
  TextField,
  Typography,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import validate from 'validate.js';
import { getUserInformation, saveUser } from '../../../utils/cookies';
import { APIService } from '../../../services/api.service';
import { Loading } from '../../common/Loading';
import countryList from './countryList';
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
  const [updatedUsername, setUpdatedUsername] = useState();
  const [username, setUsername] = useState();
  const [errorUsername, setErrorUsername] = useState();
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [fullname, setFullname] = useState();
  const [errorFullname, setErrorFullname] = useState();
  const [affiliation, setAffiliation] = useState();
  const [errorAffiliation, setErrorAffiliation] = useState();
  const [country, setCountry] = useState();
  const [birthday, setBirthday] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    const currentUser = getUserInformation();
    setUpdatedUsername(currentUser.updatedUsername);
    setUsername(currentUser.Username);
    setEmail(currentUser.Email);
    setFullname(currentUser.Fullname);
    setAffiliation(currentUser.Affiliation);
    setCountry(currentUser.Country);
    setBirthday(currentUser.Birthday);
  }, []);

  useEffect(() => {
    if (message) {
      toastContext.addNotification('Thành công', message);
    }
    if (error) {
      toastContext.addNotification('Lỗi', error, 'error');
    }
  }, [message, error]);

  const validateUsername = () => {
    if (!username) {
      setErrorUsername('Username không được để trống.');
    } else if (username.includes(' ')) {
      setErrorUsername('Tên đăng nhập không được chứa khoảng trắng');
    } else {
      setErrorUsername('');
    }
  };

  useEffect(() => {
    validateUsername();
  }, [username]);

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const validateEmail = () => {
    if (email && email.trim().length === 0) {
      setErrorEmail('Email không được trống');
      return;
    }
    if (email && email.trim().length > 255) {
      setErrorEmail('Email không được dài quá 255 kí tự');
      return;
    }
    const constraint = {
      from: {
        email: true,
      },
    };

    if (validate({ from: email }, constraint) !== undefined) {
      setErrorEmail('Email không hợp lệ');
      return;
    }
    setErrorEmail('');
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateFullname = () => {
    if (fullname && fullname.trim().length > 255) {
      setErrorFullname('Họ và tên không được dài quá 255 kí tự');
    } else {
      setErrorFullname('');
    }
  };

  useEffect(() => {
    validateFullname();
  }, [fullname]);

  const onFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const validateAffiliation = () => {
    if (affiliation && affiliation.trim().length > 255) {
      setErrorAffiliation('Nơi công tác không được dài quá 255 kí tự');
      return;
    }
    setErrorAffiliation('');
  };

  useEffect(() => {
    validateAffiliation();
  }, [affiliation]);

  const onAffiliationChange = (event) => {
    setAffiliation(event.target.value);
  };

  const onCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const onBirthdayChange = (date) => {
    setBirthday(date.valueOf());
  };

  const packUpdateData = () => {
    const currentUser = getUserInformation();
    const updateInfo = {};
    if (fullname && currentUser.Fullname !== fullname.trim()) {
      updateInfo.Fullname = fullname.trim();
    }
    if (email && currentUser.Email !== email.trim()) {
      updateInfo.Email = email.trim();
    }
    if (username && currentUser.Username !== username.trim()) {
      updateInfo.Username = username.trim();
    }

    if (birthday && parseInt(currentUser.Birthday, 10) !== parseInt(birthday, 10)) {
      updateInfo.Birthday = parseInt(birthday, 10);
    }

    if (affiliation && currentUser.Affiliation !== affiliation) {
      updateInfo.Affiliation = affiliation;
    }
    if (country && currentUser.Country !== country) {
      updateInfo.Country = country;
    }

    if (username !== currentUser.Username) {
      updateInfo.UpdatedUsername = true;
    }

    return updateInfo;
  };

  const saveUpdatedInfo = (updateInfo) => {
    const currentUser = getUserInformation();
    if (updateInfo.Fullname) {
      currentUser.Fullname = updateInfo.Fullname;
    }
    if (updateInfo.Username) {
      currentUser.Username = updateInfo.Username;
    }
    if (updateInfo.Email) {
      currentUser.Email = updateInfo.Email;
    }
    if (updateInfo.Birthday) {
      currentUser.Birthday = updateInfo.Birthday;
    }
    if (updateInfo.Affiliation) {
      currentUser.Affiliation = updateInfo.Affiliation;
    }
    if (updateInfo.Country) {
      currentUser.Country = updateInfo.Country;
    }
    if (updateInfo.UpdatedUsername) {
      currentUser.UpdatedUsername = updateInfo.UpdatedUsername;
      setUpdatedUsername(true);
    }
    saveUser(currentUser);
  };

  const onSaveInfor = async (event) => {
    event.preventDefault();
    const currentUser = getUserInformation();

    // pre-check
    if (errorUsername
      || errorEmail
      || errorFullname
      || errorAffiliation
      || error) {
      return;
    }

    // packing update data
    const updateInfo = packUpdateData();

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
        saveUpdatedInfo(updateInfo);
        setMessage('Thông tin đã được cập nhập thành công');
        setIsSaving(false);
      }
    } catch (err) {
      if (!err.message) return;
      const msg = err.message.toLowerCase();
      if (msg.includes('email')) {
        if (msg.includes('duplicate')) {
          setErrorEmail('Email đã tồn tại');
        }
        if (message.includes('invalid')) {
          setErrorEmail('Email không hợp lệ');
        }
      }
      if (msg.includes('deny')) {
        setError('Cập nhập tài khoản bị từ chối');
      }
      setIsSaving(false);
    }
    setTimeout(() => {
      setError('');
      setMessage('');
    }, 1000);
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
          Thông tin cơ bản
        </Box>
      </Typography>
      <Box
        component="form"
        mx={1}
        mt={2}
        onSubmit={onSaveInfor}
      >
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            label="Username"
            name="Username"
            variant="outlined"
            type="text"
            onChange={onUsernameChange}
            disabled={!updatedUsername}
            value={username || ''}
            error={!!errorUsername}
            helperText={errorUsername || 'Bạn chỉ được thay đổi username nếu bạn đăng ký bằng Google/Facebook, và bạn cũng chỉ được thay đổi 1 lần duy nhất'}
          />
        </Box>
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            disabled
            label="Email"
            name="Email"
            variant="outlined"
            type="text"
            value={email || ''}
            onChange={onEmailChange}
            error={!!errorEmail}
            helperText={errorEmail}
          />
        </Box>
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            label="Họ và tên"
            name="Fullname"
            variant="outlined"
            type="text"
            value={fullname || ''}
            onChange={onFullnameChange}
            error={!!errorFullname}
            helperText={errorFullname}
          />
        </Box>
        <Box my={2}>
          <CustomMuiInput
            fullWidth
            label="Nơi công tác"
            name="Fullname"
            variant="outlined"
            type="text"
            value={affiliation || ''}
            onChange={onAffiliationChange}
            error={!!errorAffiliation}
            helperText={errorAffiliation}
          />
        </Box>
        <Box my={2}>
          <FormControl variant="outlined" style={{ marginRight: '1rem' }}>
            <InputLabel htmlFor="select-country">Quốc gia</InputLabel>
            <Select
              native
              value={country || ''}
              onChange={onCountryChange}
              label="Quốc gia"
              inputProps={{
                name: 'country',
                id: 'select-country',
              }}
            >
              <option aria-label="None" value="" />
              {
                countryList.map((c) => (
                  <option key={c.value} value={c.value}>{c.text}</option>
                ))
              }
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              id="birthday-picker-dialog"
              label="Ngày sinh"
              format="DD/MM/YYYY"
              value={birthday}
              onChange={onBirthdayChange}
              KeyboardButtonProps={{
                'aria-label': 'change birthday',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box mt={2}>
          <Button
            disabled={!!isSaving}
            variant="contained"
            type="submit"
            onClick={onSaveInfor}
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
