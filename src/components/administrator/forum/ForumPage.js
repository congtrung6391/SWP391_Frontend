import { Grid, Typography } from '@mui/material';
import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import ListQuestion from './ListQuestion';

const ForumPage = () => {
  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['forum', '/admin/forum'],
        ]}
      />
      <Body>
        <Grid item md={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ pl: 2, mb: 2 }}
          >
            Forum management
          </Typography>
          <ListQuestion />
        </Grid>
      </Body>
    </>
  );
};

export default ForumPage;
