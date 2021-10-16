import React from 'react';

import {
  Avatar,
  Box,
  Toolbar,
} from '@mui/material';

import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div
      className={`${classes.root} footer`}
    >
      <Box>
        <Toolbar>
          <Avatar
            alt="Big-O Logo"
            src="logo.png"
            style={{ backgroundColor: '#fff' }}
          />
          <span style={{ color: theme.palette.primary.contrastText }}>
            &nbsp;
            <strong>
              Online Tutor
            </strong>
          </span>
        </Toolbar>
      </Box>

      <Box>
        <Toolbar
          style={{
            color: theme.palette.primary.contrastText,
          }}
        >
          <strong>
            Copyright © 2021 Online Tutor
          </strong>
        </Toolbar>
      </Box>

      {/* <List
        className={classes.root}
        style={{
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          color: theme.palette.primary.contrastText,
        }}
      >
        {
          [
            {
              Id: 1,
              Icon: <span className="fas fa-globe" />,
              Title: 'Visit us',
              Link: 'http://bigocoding.com',
            },
            {
              Id: 2,
              Icon: <span className="fab fa-facebook-f" />,
              Title: 'Like us',
              Link: 'https://www.facebook.com/BigOCoding/',
            },
            {
              Id: 3,
              Icon: <span className="fab fa-youtube" />,
              Title: 'Watch us',
              Link: 'https://www.youtube.com/channel/UChHHF-LvgQ9iLN4fNA-arow/',
            },
          ].map((item) => (
            <ListItem key={item.Id}>
              <ListItemText style={{ width: '6rem' }}>
                {item.Icon}
                {' '}
                <Link href={item.Link} color="inherit">{item.Title}</Link>
              </ListItemText>
            </ListItem>
          ))
        }
      </List> */}
    </div>
    // <div className="footer bg-dark-gray p-1 pl-5 pr-5">
    //   <div className="d-flex justify-content-between footer-content">
    //     <div className="text-left brand">
    //       <img
    //         src="logo.svg"
    //         alt="Home Page"
    //         width="40px"
    //         height="40px"
    //         className="footer-img"
    //       />
    //       {' '}
    //       <span>Big-O Coding</span>
    //     </div>
    //     <div className="text-center align-self-center">
    //       <span>Copyright © 2020 Big-O Coder</span>
    //     </div>
    //     <div className="text-right align-self-center contact">
    //       <span className="mr-3">
    //         <a href="http://bigocoding.com" rel="noopener noreferrer" target="_blank">
    //           <span className="fas fa-globe" />
    //           &nbsp;Visit us
    //         </a>
    //       </span>
    //       <span className="mr-3">
    //         <a href="https://www.facebook.com/BigOCoding/" rel="noopener noreferrer" target="_blank">
    //           <span className="fab fa-facebook-f" />
    //           &nbsp;Like us
    //         </a>
    //       </span>
    //       <span>
    //         <a href="https://www.youtube.com/channel/UChHHF-LvgQ9iLN4fNA-arow/" rel="noopener noreferrer" target="_blank">
    //           <span className="fab fa-youtube" />
    //           &nbsp;Watch us
    //         </a>
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
