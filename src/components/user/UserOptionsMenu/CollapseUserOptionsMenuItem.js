import React, { useContext } from 'react';
import {
  ListItemText,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';

import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../../context/authentication.context';

const CollapseUserOptionsMenuItem = ({ onClick }) => {
  const { logout, user } = useContext(AuthenticationContext);
  const { id } = user;

  const handleClose = () => {
    onClick();
  };

  const handleLogout = () => {
    logout();
  };

  const MenuOptions = [
    {
      Id: uniqid(),
      Icon: <BallotIcon fontSize="small" />,
      Content: 'Your course',
      Link: `/users/${id}/edit`,
      EventHandler: handleClose,
    },
    {
      Id: uniqid(),
      Icon: <AccountCircleIcon fontSize="small" />,
      Content: 'Profile',
      Link: `/users/${id}/edit`,
      EventHandler: handleClose,
    },
    {
      Id: uniqid(),
      Icon: <ExitToAppIcon fontSize="small" />,
      Content: 'Logout',
      Link: '/',
      EventHandler: handleLogout,
    },
  ];

  return (
      MenuOptions.map((op) => (
        <Link key={op.Id} to={op.Link}>
          <ListItem
            onClick={op.EventHandler}
          >
            <ListItemIcon>{op.Icon}</ListItemIcon>
            <ListItemText>{op.Content}</ListItemText>
          </ListItem>
        </Link>
      ))
  );
};

CollapseUserOptionsMenuItem.propTypes = {
  onClick: PropTypes.func,
};
CollapseUserOptionsMenuItem.defaultProps = {
  onClick: () => {},
};

export default CollapseUserOptionsMenuItem;
