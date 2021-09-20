import React from 'react';
import {
  Paper, Box, ListItem, ListItemText,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import StarsIcon from '@material-ui/icons/Stars';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SideTabControl from '../../basic/SideTabControl/SideTabControl';

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
      <ListItem route="submission" key="submission">
        <TurnedInIcon />
        &nbsp;
        <ListItemText>Bài nộp</ListItemText>
      </ListItem>
      <ListItem route="certificates" key="cert">
        <VerifiedUserIcon />
        &nbsp;
        <ListItemText>Chứng chỉ</ListItemText>
      </ListItem>
      <ListItem route="pricing" key="pricing">
        <StarsIcon />
        &nbsp;
        <ListItemText>Premium</ListItemText>
      </ListItem>
    </SideTabControl>
  </Paper>
);

export default UserSideNavigation;
