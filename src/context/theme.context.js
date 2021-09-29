import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material';

const ThemeWrapper = (props) => {
  const theme = createTheme({
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
      error: {
        main: '#F56A6A',
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
    <ThemeProvider theme={theme}>
      {
        children
      }
    </ThemeProvider>
  );
};

export default ThemeWrapper;
