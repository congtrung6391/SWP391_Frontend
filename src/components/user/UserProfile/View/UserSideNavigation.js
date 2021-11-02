import React from 'react';
import {
  Paper, Box, ListItem, ListItemText,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import StarsIcon from '@mui/icons-material/Stars';
import SideTabControl from '../../../basic/SideTabControl/SideTabControl';

const UserSideNavigation = ({ rating }) => (
  <Paper
    component={Box}
    p={2}
    px={1}
    boxShadow={2}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    textAlign="left"
  >
    <SideTabControl
      childClassName="userprofile-side-nav"
      activeClassName="active-tab"
      controlKey="userprofile-view"
    >
      <ListItem route="info" key="info">
        <AccountCircleIcon />
        &nbsp;
        <ListItemText>Basic information</ListItemText>
      </ListItem>
      {
        rating && (
          <ListItem route="rating" key="rating">
            <StarsIcon />
            &nbsp;
            <ListItemText>Rating</ListItemText>
          </ListItem>
        )
      }
    </SideTabControl>
  </Paper>
);

export default UserSideNavigation;
