import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Typography, Button,
} from '@mui/material';
import { saveUser, getUserInformation } from '../../../../utils/cookies';
import { APIService } from '../../../../services/api.service';
import ImageService from '../../../../services/image.service';
import ImageUploader from '../../../basic/ImageUploader/ImageUploader';

const UserAvatar = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [showImageUploader, setShowImageUploader] = useState(false);

  useEffect(() => {
    const inCookieeUser = getUserInformation();
    setUser(inCookieeUser);
  }, []);

  const toggleImageUploader = () => {
    setShowImageUploader(!showImageUploader);
  };

  const onUploadImage = async (images) => {
    try {
      images.forEach(async (image) => {
        // console.log(image);
        try {
          // eslint-disable-next-line no-await-in-loop
          const url = await ImageService.uploadImage(image);
          // console.log(url);
          const newAvatar = {
            Id: getUserInformation('Id'),
            Avatar: url,
          };

          await new APIService(
            'put',
            `users/${getUserInformation('Username')}`,
            null,
            newAvatar,
            true,
          ).request();

          user.Avatar = url;
          saveUser(user);
          setUser(user);
          return;
        } catch (err) {
          // console.log(error);
          setError('Cannot upload image.');
        }
      });
    } catch (err) {
      // console.log(error);
      setError(err);
    }
  };

  return (
    <Paper
      component={Box}
      elevation={2}
      p={3}
      mb={2}
      boxShadow={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
    >
      <div className="userprofile-avatar">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${user.Avatar || './image/user.png'})`,
          }}
        />
        <Button
          variant="contained"
          className="change-avatar-btn"
          color="secondary"
          onClick={toggleImageUploader}
        >
          Edit
        </Button>
        <ImageUploader
          show={showImageUploader}
          onHide={toggleImageUploader}
          uploadImage={onUploadImage}
        />
      </div>
      {
        error && (
          <Typography color="secondary">{error}</Typography>
        )
      }
      <Typography component="div">
        <Box
          fontWeight="fontWeightBold"
          fontSize="h6.fontSize"
          mt={2}
        >
          {user.Fullname || '#Full name'}
        </Box>
        <Box
          fontStyle="italic"
          fontSize="subtitle1.fontSize"
        >
          {user.Email || '#email'}
        </Box>
      </Typography>
    </Paper>
  );
};

export default UserAvatar;
