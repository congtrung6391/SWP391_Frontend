import React, {
  useState, useContext, useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';

// Material-UI
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Container,
} from '@mui/material';
import {
  makeStyles,
} from '@mui/styles';
import {
  HelpOutline,
  ArrowBackIosNew as ArrowLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { displayDesktop, displayMobile } from '../../utils/materialDisplay';

import { AuthenticationContext } from '../../context/authentication.context';
import UserOptionsMenu from '../user/UserOptionsMenu/UserOptionsMenu';
import CollapseUserOptionsMenuItem from '../user/UserOptionsMenu/CollapseUserOptionsMenuItem';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  'nav-menu': {
    display: 'flex',
    flexDirection: 'row',
  },
  'drawer-header': {
    minWidth: '75vw',
    display: 'flex',
    flexDirection: 'row',
  },
});

const Header = () => {
  const { verifyUser, verifyTutor, user } = useContext(AuthenticationContext);
  const [navItems, setNavItems] = useState([]);
  const [openMobibleMenu, setOpenMobileMenu] = useState(false);
  const classes = useStyles();

  const getNavMenu = () => {
    const items = [];

    // Default
    items.push({
      Id: 1,
      Link: '/courses',
      Title: 'Course',
    });
    items.push({
      Id: 2,
      Link: '/tutors',
      Title: 'Tutor',
    });
    items.push({
      Id: 3,
      Link: '/forum',
      Title: 'Forum',
    })

    setNavItems(items);
  };

  useEffect(() => {
    getNavMenu();
  }, []);

  const toggleDrawler = () => {
    if (openMobibleMenu) {
      setNavItems([]);
      setOpenMobileMenu(false);
    } else {
      getNavMenu();
      setOpenMobileMenu(true);
    }
  };

  const renderNavMenu = () => (
    <Box display={displayDesktop}>
      <List className={`${classes['nav-menu']}`}>
        {
          navItems.map((item) => (
            <NavLink className="nav-item" key={item.Id} to={item.Link}>
              <ListItem color="inherit">
                <ListItemText primary={item.Title} />
              </ListItem>
            </NavLink>
          ))
        }
      </List>
    </Box>
  );

  const renderNavMenuMobile = () => (
    <SwipeableDrawer
      className={classes['styled-drawer']}
      anchor="left"
      open={openMobibleMenu}
      onClose={toggleDrawler}
      onOpen={toggleDrawler}
    >
      <div
        className={classes['drawer-header']}
        onClick={toggleDrawler}
        role="button"
        tabIndex={0}
      >
        {
          !verifyUser()
            ? (
              <List className={classes['nav-menu']}>
                <NavLink to="/register" onClick={toggleDrawler}>
                  <ListItem>
                    <ListItemText primary="Đăng ký" />
                  </ListItem>
                </NavLink>
                <NavLink to="/login" onClick={toggleDrawler}>
                  <ListItem>
                    <ListItemText primary="Đăng nhập" />
                  </ListItem>
                </NavLink>
              </List>
            )
            : (
              <Box className={classes['nav-menu']} m="0.7rem">
                <Avatar
                  border={1}
                  alt={user.Username}
                  src={user.Avatar || './image/default_avatar.jpg'}
                />
                <Box ml="1rem">
                  <strong>{ user.Username }</strong>
                  <br />
                  <i>{ user.Email }</i>
                </Box>
              </Box>
            )
        }
        <Box
          ml="auto"
          component={IconButton}
          color="inherit"
        >
          <ArrowLeftIcon fontSize="large" />
        </Box>
      </div>
      <Divider />
      <List>
        {
          navItems.map((item) => (
            <NavLink key={item.Id} to={item.Link} onClick={toggleDrawler}>
              <ListItem key={item.Id}>
                <ListItemText primary={item.Title} />
              </ListItem>
            </NavLink>
          ))
        }
        {
          verifyUser() && (
            [
              <Divider key={6} />,
              <CollapseUserOptionsMenuItem key={7} onClick={toggleDrawler} />,
            ]
          )
        }
        <Divider />
        <NavLink to="/help" onClick={toggleDrawler}>
          <ListItem button>
            <ListItemIcon>
              <HelpOutline color="inherit" />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </SwipeableDrawer>
  );

  return (
    <div className="header">
      <AppBar position="static" color="inherit">
        <Container>
          <Toolbar style={{ paddingLeft: '0', paddingRight: '0' }}>
            <NavLink className="no-border" to="/">
              <IconButton>
                <Avatar
                  alt="Online tutor"
                  src="logo.png"
                />
              </IconButton>
            </NavLink>

            {/* <div className={classes.grow} /> */}
            
            {renderNavMenu()}

            <div className={classes.grow} />

            {
              verifyTutor()
              && (
                <List className={classes['nav-menu']}>
                  <ListItem button>
                    <NavLink className="admin-badge" to="/admin">
                      <ListItemText>
                        <span className="fas fa-cogs" />
                        &nbsp;&nbsp;
                        { user.Role }
                      </ListItemText>
                    </NavLink>
                  </ListItem>
                </List>
              )
            }

            {
              verifyUser()
                ? (
                  <Box display={displayDesktop}>
                    <UserOptionsMenu />
                  </Box>
                )
                : (
                  <List className={classes['nav-menu']}>
                    <NavLink className="nav-item" to="/register">
                      <ListItem>
                        <ListItemText primary="Đăng ký" />
                      </ListItem>
                    </NavLink>
                    <NavLink className="nav-item" to="/login">
                      <ListItem>
                        <ListItemText primary="Đăng nhập" />
                      </ListItem>
                    </NavLink>
                  </List>
                )
            }

            {
              verifyUser() && (
                <Box display={displayMobile}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawler}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Box>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
      {renderNavMenuMobile()}
    </div>
  );
};

export default Header;
