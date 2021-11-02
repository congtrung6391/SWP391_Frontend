import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Typography, Button,
} from '@mui/material';
import { saveUser, getUserInformation } from '../../../../utils/cookies';
import { APIService } from '../../../../services/api.service';
import ImageService from '../../../../services/image.service';
import ImageUploader from '../../../basic/ImageUploader/ImageUploader';

const UserAvatar = () => {
  const [avatar, setAvatar] = useState(undefined);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [showImageUploader, setShowImageUploader] = useState(false);

  useEffect(() => {
    const inCookieeUser = getUserInformation();
    setUser(inCookieeUser);
    setAvatar(inCookieeUser.avatar);
  }, []);

  const toggleImageUploader = () => {
    setShowImageUploader(!showImageUploader);
  };

  const onUploadImage = async (images) => {
    const image = images[0];
    // console.log(image);
    try {
      // eslint-disable-next-line no-await-in-loop
      const url = await ImageService.uploadImage(image);

      const newAvatar = {
        avatar: url,
      };

      await new APIService(
        'put',
        `user/${getUserInformation('id')}`,
        null,
        newAvatar,
        true,
      ).request();

      user.avatar = url;
      saveUser(user);
      setUser(user);
      setAvatar(url);
      return;
    } catch (err) {
      // console.log(error);
      setError('Cannot upload image.');
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
            backgroundImage: `url(${avatar || './image/user.png'})`,
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
          {user.username || '#username'}
        </Box>
        <Box
          fontStyle="italic"
          fontSize="subtitle1.fontSize"
        >
          {user.email || '#email'}
        </Box>
      </Typography>
    </Paper>
  );
};

export default UserAvatar;
