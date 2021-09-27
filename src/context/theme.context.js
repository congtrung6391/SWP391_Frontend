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
        main: '#21B8D9',
        contrastText: '#fff',
      },
      secondary: {
        main: '#DC8EF8',
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
