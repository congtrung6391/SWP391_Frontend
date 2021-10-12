import React, { useContext, useEffect, useState } from 'react';
import MomentUtils from '@date-io/moment';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  useTheme,
  withStyles,
} from '@mui/styles';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/lab';
import { getUserInformation, saveUser } from '../../../../utils/cookies';
import { APIService } from '../../../../services/api.service';
import { Loading } from '../../../common/Loading';
import { ToastContext } from '../../../../context/toast.context';

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

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const [fullname, setFullname] = useState('');
  const [errorFullname, setErrorFullname] = useState('');
  const validateFullname = () => {
    if (fullname && fullname.trim().length > 255) {
      setErrorFullname('Fullname cannot have length greater than 255');
    } else {
      setErrorFullname('');
    }
  };
  useEffect(() => {
    validateFullname();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullname]);
  const onChangeFullname = (event) => {
    setFullname(event.target.value);
  }

  const [affiliation, setAffiliation] = useState('');
  const [errorAffiliation, setErrorAffiliation] = useState('');
  const validateAffiliation = () => {
    if (affiliation && affiliation.trim().length > 255) {
      setErrorAffiliation('Nơi công tác không được dài quá 255 kí tự');
      return;
    }
    setErrorAffiliation('');
  };
  useEffect(() => {
    validateAffiliation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliation]);
  const onChangeAffiliation = (event) => {
    setAffiliation(event.target.value);
  }

  const [mobile, setMobile] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const validateMobile = () => {
    if (!mobile) {
      setErrorMobile('Phone cannot be empty.');
    } else if (mobile.length !== 10 || isNaN(parseInt(mobile, 10))) {
      setErrorMobile('Invalid phone number.');
    } else {
      setErrorMobile('');
    }
  }
  useEffect(() => {
    validateMobile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);
  const onChangeMobile = (event) => {
    setMobile(event.target.value);
  } 

  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const validateAddress = () => {
    if (address && address.length > 100) {
      setErrorAddress('Address cannot have length greater than 100.');
    } else {
      setErrorMobile('');
    }
  }
  useEffect(() => {
    validateAddress()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const [facebookUrl, setFacebookUrl] = useState('');
  const [errorFacebookUrl, setErrorFacebookUrl] = useState('');
  const validateFacebookUrl = () => {
    setErrorFacebookUrl('');
  };
  useEffect(() => {
    validateFacebookUrl();
  }, [facebookUrl])
  const onChangeFacebookUrl = (event) => {
    setFacebookUrl(event.target.value);
  }

  const [jobTitle, setJobTitle] = useState('');
  const [errorJobTitle, setErrorJobTitle] = useState('');
  const validateJobTitle = () => {
    setErrorJobTitle('');
  }
  useEffect(() => {
    validateJobTitle();
  })
  const onChangeJobTitle = (event) => {
    setJobTitle(event.target.value);
  } 

  const [gpa, setGpa] = useState('');
  const [errorGpa, setErrorGpa] = useState('');
  const validateGpa = () => {
    setErrorGpa('');
  };
  useEffect(() => {
    validateGpa()
  }, [gpa])
  const onChangeGpa = (event) => {
    setGpa(event.target.value);
  }
  const [birthday, setBirthday] = useState();
  const onBirthdayChange = (date) => {
    setBirthday(date.valueOf());
  };

  const [gender, setGender] = useState('');
  const onChangeGender = (event) => {
    setGender(event.target.value);
  }

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    const currentUser = getUserInformation();
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setFullname(currentUser.fullname);
    setAffiliation(currentUser.affiliation);
    setAddress(currentUser.address);
    setMobile(currentUser.Mobile);
    setFacebookUrl(currentUser.facebookUrl);
    setJobTitle(currentUser.jobTitle);
    setGpa(currentUser.gpa);
    setBirthday(currentUser.birthday);
  }, []);

  useEffect(() => {
    if (message) {
      toastContext.addNotification('Success', message);
    }
    if (error) {
      toastContext.addNotification('Error', error, 'error');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, error]);

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
    saveUser(currentUser);
  };

  const onSaveInfor = async (event) => {
    event.preventDefault();
    const currentUser = getUserInformation();

    // pre-check
    if (errorFullname
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

  const inputItemList = [
    {
      label: 'Fullname',
      name: 'fullname',
      value: fullname || '',
      onChange: onChangeFullname,
      helperText: errorFullname,
      disabled: false,
      error: !!errorFullname,
    },
    {
      label: 'Phone number',
      name: 'mobile',
      value: mobile || '',
      onChange: onChangeMobile,
      helperText: errorMobile,
      disabled: false,
      error: !!errorMobile,
    },
    {
      label: 'Address',
      name: 'address',
      value: address || '',
      onChange: onChangeAddress,
      helperText: errorAddress,
      disabled: false,
      error: !!errorAddress,
    },
    {
      label: 'Facebook',
      name: 'facebookUrl',
      value: facebookUrl || '',
      onChange: onChangeFacebookUrl,
      helperText: errorFacebookUrl,
      disabled: false,
      error: !!errorFacebookUrl,
    },
    {
      label: 'Job Title',
      name: 'jobTitle',
      value: jobTitle || '',
      onChange: onChangeJobTitle,
      helperText: errorJobTitle,
      disabled: false,
      error: !!errorJobTitle,
    },
    {
      label: 'Affiliation',
      name: 'affiliation',
      value: affiliation || '',
      onChange: onChangeAffiliation,
      helperText: errorAffiliation,
      disabled: false,
      error: !!errorAffiliation,
    },
  ]

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
        {
          inputItemList.map((item) => (
            <Box my={2}>
              <CustomMuiInput
                fullWidth
                label={item.label}
                name={item.name}
                variant="outlined"
                type="text"
                value={item.value}
                onChange={item.onChange}
                error={!!item.error}
                helperText={item.helperText}
              />
            </Box>
          ))
        }
        <Box my={2} display="flex" flexDirection="row">
          <LocalizationProvider dateAdapter={MomentUtils}>
            <DatePicker
              inputVariant="outlined"
              id="birthday-picker-dialog"
              label="Ngày sinh"
              format="DD/MM/YYYY"
              value={birthday}
              onChange={onBirthdayChange}
              KeyboardButtonProps={{
                'aria-label': 'change birthday',
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box ml={2}>
            <CustomMuiInput
              fullWidth
              label='GPA'
              name='gpa'
              variant="outlined"
              type="text"
              value={gpa || ''}
              onChange={onChangeGpa}
              error={!!errorGpa}
              helperText={errorGpa}
            />
          </Box>
          <Box ml={2} sx={{ minWidth: '7rem' }}>
            <FormControl fullWidth>
              <InputLabel id="profile-gender">Gender</InputLabel>
              <Select
                labelId="profile-gender-select"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={onChangeGender}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Prefer not to say</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
