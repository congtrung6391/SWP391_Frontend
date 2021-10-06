import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from '@mui/material';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import ListUsers from './ListUsers';
import SearchBar from '../../common/SearchBar';

const UserPage = () => {
  const [totalUser, setTotalUsers] = useState(0);

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['users', '/admin/users'],
        ]}
      />
      <Body>
        <Grid md={12}>
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
