import React, { useState, useContext } from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Collapse,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../../context/authentication.context';

const CollapseUserOptionsMenuItem = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useContext(AuthenticationContext);
  const {
    Avatar: AvatarImg, Username, Id,
  } = user;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    onClick();
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  const MenuOptions = [
    {
      Id: uniqid(),
      Icon: <span className="fas fa-user-circle mr-2 fa-fw" />,
      Content: 'Your profile',
      Link: `/users/${Id}`,
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
