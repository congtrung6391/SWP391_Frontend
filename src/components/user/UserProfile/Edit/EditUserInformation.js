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

  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const validatePhone = () => {
    if (!phone) {
      setErrorPhone('Phone cannot be empty.');
    } else if (phone.length !== 10 || isNaN(parseInt(phone, 10))) {
      setErrorPhone('Invalid phone number.');
    } else {
      setErrorPhone('');
    }
  }
  useEffect(() => {
    validatePhone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  }

  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const validateAddress = () => {
    if (address && address.length > 100) {
      setErrorAddress('Address cannot have length greater than 100.');
    } else {
      setErrorPhone('');
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
    console.log(currentUser);
    setFullname(currentUser.fullName);
    setAffiliation(currentUser.affiliation);
    setAddress(currentUser.address);
    setPhone(currentUser.phone);
    setFacebookUrl(currentUser.facebookUrl);
    setJobTitle(currentUser.jobTitle);
    setGpa(currentUser.gpa || 0);
    setBirthday(currentUser.birthday || undefined);
    setGender(currentUser.gender || 'Other');
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const updateInfo = {};
    const user = getUserInformation();

    if (user.fullName !== fullname.trim()) {
      updateInfo.fullName = fullname.trim();
    }

    if (address && user.address !== address) {
      updateInfo.address = address;
    }

    if (affiliation && user.afffiliation !== affiliation) {
      updateInfo.affiliation = affiliation;
    }

    if (facebookUrl && user.facebookUrl !== facebookUrl) {
      updateInfo.facebookUrl = facebookUrl;
    }

    if (gender && user.gender !== gender) {
      updateInfo.gender = gender;
    }

    if (gpa && user.gpa !== gpa) {
      updateInfo.gpa = gpa;
    }

    if (phone && user.phone !== phone) {
      updateInfo.phone = phone;
    }

    if (birthday && parseInt(user.birthday, 10) !== parseInt(birthday, 10)) {
      updateInfo.Birthday = parseInt(birthday, 10);
    }

    return updateInfo;
  };

  const saveUpdatedInfo = (updateInfo) => {
    const currentUser = getUserInformation();
    Object.keys(updateInfo).forEach((key) => {
      currentUser[key] = updateInfo[key];
    })
    saveUser(currentUser);
  };

  const onSaveInfor = async (event) => {
    event.preventDefault();

    if (errorFullname
      || errorAffiliation
      || errorAddress
      || errorFacebookUrl
      || errorJobTitle
      || errorGpa
      || errorPhone
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
          'post',
          `user/${getUserInformation('id')}`,
          null,
          updateInfo,
          true,
        ).request();
        // Save to local
        saveUpdatedInfo(updateInfo);
        setMessage('Save information success');
        setIsSaving(false);
      }
    } catch (err) {
      if (!err.message) return;
      const msg = err.message.toLowerCase();
      setError(msg);
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
      name: 'phone',
      value: phone || '',
      onChange: onChangePhone,
      helperText: errorPhone,
      disabled: false,
      error: !!errorPhone,
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
            <Box my={2} key={item.label}>
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
                : 'Save'
            }
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserPassword;
