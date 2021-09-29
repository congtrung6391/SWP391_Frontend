import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// import { Image } from 'react-bootstrap';
import uniqid from 'uniqid';
import { AuthenticationContext } from '../../../context/authentication.context';

const UserOptionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { logout, user } = useContext(AuthenticationContext);
  const {
    avatar: avatarImg, username, email, id,
  } = user;

  const handleMenu = (event) => {
    event.preventDefault();
    const anchor = document.getElementById('user-options-div');
    setAnchorEl(anchor);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <div id="user-options-div">
      <Button
        aria-label="user-avatar"
        aria-controls="user-options-menu"
        aria-haspopup="true"
        sx = {{ color: 'primary.main', marginRight: 1 }}
        variant="text"
        style={{
          textTransform: 'unset',
          borderRadius: '2rem',
          padding: '0.2rem',
        }}
        component={Link}
        to={`/users/${id}`}
      >
        <Avatar
          border={1}
          sx={{ bgcolor: 'primary.main' }}
          alt={`${username}`}
          src={avatarImg || './image/default_avatar.jpg'}
          style={{
            height: theme.spacing(4),
            width: theme.spacing(4),
            marginRight: '0.3rem',
          }}
        />
        <Box>
          <Typography noWrap style={{ maxWidth: '8rem' }}>{user.username}</Typography>
        </Box>
      </Button>
      <IconButton sx={{ color: 'error.main' }} onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );

  // return (
  //   <div className="user-option-menu mr-3">
  //     <ul className="list-unstyled d-flex h-100 mb-0">
  //       <li className="d-flex px-1 py-1 flex-column justify-content-center">
  //         <div
  //           // to={ `/users/${ Username }` }
  //           className="avatar d-flex"
  //         >
  //           <Image
  //             src={Avatar || './image/default_avatar.jpg'}
  //             fluid
  //             roundedCircle
  //             width="32px"
  //             className="m-auto shadow-sm"
  //             style={{ height: '32px' }}
  //           />
  //         </div>
  //       </li>
  //       <li className="d-block">
  //         <div
  //           // to={ `/users/${ Username }` }
  //           className="h-100 py-1 ml-1 mr-1 d-flex"
  //         >
  //           <div className="m-auto username">{ Username }</div>
  //         </div>
  //       </li>
  //     </ul>
  //     <div className="user-option-menu-dropdown-padding">&nbsp;</div>
  //     <div className="user-option-menu-dropdown shadow-sm bg-white border rounded">
  //       <div className="dark-gray">
  //         <ul className="list-unstyled mb-0">
  //           <div className="d-flex m-2">
  //             <div className="mr-2" style={{ width: '48px!important' }}>
  //               <Image
  //                     src={Avatar || './image/default_avatar.jpg'}
  //                     fluid
  //                     roundedCircle
  //                     width="48px"
  //                     className="avatar flex-grow-1"
  //                     style={{ height: '48px' }}
  //                   />
  //             </div>
  //             <div style={{ maxWidth: '220px' }}>
  //               <h4 className="my-1"><strong>{ Username }</strong></h4>
  //               <p className="text-secondary m-0"><i>{ Email }</i></p>
  //             </div>
  //           </div>
  //           <li className="px-3 py-2">
  //             <Link to={`/users/${Id}`}>
  //               <span className="fas fa-user-circle mr-2 fa-fw" />
  //               Thông tin của bạn
  //             </Link>
  //           </li>
  //           <li className="px-3 py-2">
  //             <div role="button" tabIndex={0} onClick={logout}>
  //               <span className="fas fa-sign-out-alt mr-2 fa-fw" />
  //               Đăng xuất
  //             </div>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default UserOptionsMenu;
