import React from 'react';
import {
  Paper, Box, ListItem, ListItemText,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  VpnKey as VpnKeyIcon,
} from '@mui/icons-material';
import SideTabControl from '../../../basic/SideTabControl/SideTabControl';

const UserSideNavigation = () => (
  <Paper
    component={Box}
    mb={2}
    p={3}
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
        <ListItemText>Thông tin cơ bản</ListItemText>
      </ListItem>
      <ListItem route="password" key="password">
        <VpnKeyIcon />
        &nbsp;
        <ListItemText>Tài khoản & Mật khẩu</ListItemText>
      </ListItem>
    </SideTabControl>
  </Paper>
);

export default UserSideNavigation;
