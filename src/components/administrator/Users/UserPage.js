import React from 'react';
import {
  Typography,
  Grid,
} from '@mui/material';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import ListUsers from './ListUsers';

const UserPage = () => {

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['users', '/admin/users'],
        ]}
      />
      <Body>
        <Grid item md={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ pl: 2, mb: 2 }}
          >
            Account management
          </Typography>
          <ListUsers />
        </Grid>
      </Body>
    </>
  );
};

export default UserPage;
