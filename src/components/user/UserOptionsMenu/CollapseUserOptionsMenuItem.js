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
      Content: 'Thông tin của bạn',
      Link: `/users/${Id}`,
      EventHandler: handleClose,
    },
    {
      Id: uniqid(),
      Icon: <span className="fas fa-sign-out-alt mr-2 fa-fw" />,
      Content: 'Đăng xuất',
      Link: '/',
      EventHandler: handleLogout,
    },
  ];

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar
            border={1}
            alt={Username}
            src={AvatarImg || './image/default_avatar.jpg'}
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </ListItemAvatar>
        <ListItemText primary="Tài khoản" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <Divider />
          {
            MenuOptions.map((op) => (
              <Link key={op.Id} to={op.Link}>
                <ListItem
                  onClick={op.EventHandler}
                >
                  <ListItemIcon />
                  <ListItemText>{op.Content}</ListItemText>
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Collapse>
    </div>
  );
};

CollapseUserOptionsMenuItem.propTypes = {
  onClick: PropTypes.func,
};
CollapseUserOptionsMenuItem.defaultProps = {
  onClick: () => {},
};

export default CollapseUserOptionsMenuItem;
