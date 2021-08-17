import { IconButton, Box, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState, useRef } from 'react';

const UserMenu = () => {
  const anchorEl = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const user = { 
    username: '#username',
  }
  const toggleMenu = (event) => {
    setOpenMenu(!openMenu);
  }

  return (
    <Box>
      <IconButton
        aria-controls="user-menu"
        color="inherit"
        onClick={toggleMenu}
      >
        <AccountCircleIcon ref={anchorEl} />
      </IconButton>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenu}
        onClose={toggleMenu}
      >
        <MenuItem onClick={toggleMenu}>Profile</MenuItem>
        <MenuItem onClick={toggleMenu}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
