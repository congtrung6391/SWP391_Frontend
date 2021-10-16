import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../../BrowserHistory';
import {
  Box,
  Button,
  Avatar,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';

import { AuthenticationContext } from '../../../context/authentication.context';

const UserOptionsMenu = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { logout, user } = useContext(AuthenticationContext);
  const {
    avatar: avatarImg, username, id,
  } = user;

  const handleLogout = async () => {
    await logout();
    history.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div id="user-options-div">
      <Button
        aria-label="user-avatar"
        aria-controls="user-options-menu"
        aria-haspopup="true"
        variant="text"
        sx={{
          color: 'primary.main',
          mr: 1,
          textTransform: 'unset',
          borderRadius: '2rem',
          p: '0.2rem',
          pr: '0.6rem',
          border: 2,
        }}
        onClick={openMenu}
        // component={Link}
        // to={`/users/${id}/edit`}
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
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <BallotIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            Your course
          </ListItemText>
        </MenuItem>
        <NavLink to={`/users/${id}/edit`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              Profile
            </ListItemText>
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
      {/* <IconButton sx={{ color: 'error.main' }} onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton> */}
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
