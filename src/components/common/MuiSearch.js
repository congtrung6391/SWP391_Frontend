import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.primary.main, 0.05),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     // marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   '& .MuiInputLabel-root': {
//     color: 'green',
//   },
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     border: '2px solid',
//     borderColor: theme.palette.primary.main,
//     borderRadius: '5px',
//     [theme.breakpoints.up('sm')]: {
//       // width: '12ch',
//       // '&:focus': {
//       //   width: '20ch',
//       // },
//     },
//   },
// }));

const SearchBar = ({ value, placeholder, id, label, onChange, onSearch }) => {
  const onKeyPress = (event) => {
    if (event.code === 'Enter') {
      onSearch();
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label || 'Search...'}</InputLabel>
      <OutlinedInput
        id={id}
        label={ label || 'Search' }
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        fullWidth
        placeholder={ placeholder || "Search…" }
        inputProps={{
          'aria-label': 'search',
          sx: {
            lineHeight: '1rem',
            py: '0.65rem',
          }
        }}
        onChange={onChange}
        value={value || ''}
        onKeyPress={onKeyPress}
      />
    </FormControl>
  );
}

export default SearchBar;

