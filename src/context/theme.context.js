import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const ThemeWrapper = (props) => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: {
        light: '#fff',
        main: '#2c3e50',
        dark: '#000',
      },
      secondary: {
        main: '#3498db',
        contrastText: '#fff',
      },
      success: {
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',
        contrastText: '#fff',
      },
      start: {
        light: '#5abafa',
        main: '#3498db',
        dark: '#1276b8',
        contrastText: '#fff',
      },
    },
  });

  const { children } = props;

  return (
    <MuiThemeProvider theme={theme}>
      {
        children
      }
    </MuiThemeProvider>
  );
};

export default ThemeWrapper;
