import { NavLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import UserMenu from '../user/userprofile/UserMenu';

const Header = () => {
  const user = true;
  return (
    <AppBar className="header" position="relative">
      <Toolbar component={Box} display="flex" justifyContent="space-between">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <i className="fab fa-angular"></i>
          &nbsp;
          <Typography variant="h5"><strong>Brand</strong></Typography>
        </IconButton>
        <Box>
          <Typography className="nav-link" component={NavLink} to="home">Home</Typography>        
          <Typography className="nav-link" component={NavLink} to="link1">Link 1</Typography>
          <Typography className="nav-link" component={NavLink} to="link2">Link 2</Typography>
          <Typography className="nav-link" component={NavLink} to="link3">Link 3</Typography>
        </Box>
        {
          user
            ? (
              <Box display="flex">
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
                <UserMenu />
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Box>
            )
            : (
              <Box>
                <Typography className="nav-link" component={NavLink} to="login">Log in</Typography>
                <Typography className="nav-link" component={NavLink} to="signin">Sign in</Typography>
              </Box>
            )
        }
      </Toolbar>
    </AppBar>
  )
};

export default Header;