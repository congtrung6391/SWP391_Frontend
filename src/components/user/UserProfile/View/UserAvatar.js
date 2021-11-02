import React from 'react';
import {
  Paper, Box, Typography
} from '@mui/material';

const UserAvatar = ({ user }) => {
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
            backgroundImage: `url(${user.avatar ? user.avatar : '/image/background/tutor.jpg'})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>
      <Typography component="div">
        <Box
          fontWeight="fontWeightBold"
          fontSize="h6.fontSize"
          mt={2}
        >
          {user.fullName || '#Full name'}
        </Box>
        <Box
          fontStyle="italic"
          fontSize="subtitle1.fontSize"
          noWrap
        >
          <Typography>
            {user.email || '#email'}
          </Typography>
        </Box>
      </Typography>
    </Paper>
  );
};

export default UserAvatar;
