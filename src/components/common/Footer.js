import React from 'react';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@material-ui/core';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      style={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}
    >
      <Toolbar component={Box} justifyContent="center">
        <Typography textAlign="center">Create by me</Typography>
      </Toolbar>
    </Box>
  );
};

export default Footer;
