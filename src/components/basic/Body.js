/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Container,
} from '@mui/material';

import { breakpointPropType } from '../../propTypes/propTypes';

import LocalStorageService from '../../services/localStorage.service';
import ToastStack from './ToastStack';

const Body = ({ className, children, backgroundColor }) => (
  <Box
    component={Grid}
    pt="1rem"
    pb="1rem"
    className={`${className}`}
    style={{ background: backgroundColor }}
  >
    <Container className="content-body">
      <Grid container justifyContent="center">
        {children}
      </Grid>
      <ToastStack />
    </Container>
  </Box>
);
Body.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
};
Body.defaultProps = {
  className: '',
  backgroundColor: '#fff',
};

export const Main = ({ gridBreakpont, className, children }) => (
  <Grid
    item
    xs={gridBreakpont.xs || 12}
    sm={gridBreakpont.sm || 12}
    md={gridBreakpont.md || 9}
    lg={gridBreakpont.lg || 9}
    xl={gridBreakpont.xl || 9}
    className={`${className || ''}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    }}
  >
    {children}
  </Grid>
);
Main.propTypes = {
  className: PropTypes.string,
  gridBreakpont: breakpointPropType,
};
Main.defaultProps = {
  className: '',
  gridBreakpont: {},
};

export const SideBar = ({ gridBreakpont, className, children }) => (
  <Grid
    item
    xs={gridBreakpont.xs || 12}
    sm={gridBreakpont.sm || 12}
    md={gridBreakpont.md || 3}
    lg={gridBreakpont.lg || 3}
    xl={gridBreakpont.xl || 3}
    className={` ${className || ''}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    }}
  >
    {children}
  </Grid>
);
SideBar.propTypes = {
  className: PropTypes.string,
  gridBreakpont: breakpointPropType,
};
SideBar.defaultProps = {
  className: '',
  gridBreakpont: {},
};

export default Body;
