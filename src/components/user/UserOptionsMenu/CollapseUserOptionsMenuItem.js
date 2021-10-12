import React, { useContext } from 'react';
import {
  ListItemText,
  ListItem,
} from '@mui/material';

import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../../context/authentication.context';

const CollapseUserOptionsMenuItem = ({ onClick }) => {
  const { logout, user } = useContext(AuthenticationContext);
  const { Id } = user;

  const handleClose = () => {
    onClick();
  };

  const handleLogout = () => {
    logout();
  };

  const MenuOptions = [
    {
      Id: uniqid(),
      Icon: <span className="fas fa-user-circle mr-2 fa-fw" />,
      Content: 'Your profile',
      Link: `/users/${Id}/edit`,
      EventHandler: handleClose,
    },
    {
      Id: uniqid(),
      Icon: <span className="fas fa-sign-out-alt mr-2 fa-fw" />,
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
