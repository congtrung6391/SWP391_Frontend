import React from 'react';
import {
  Box,
  Rating,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const SingleListTutor = ({ tutor }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        height: '15rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bgcolor: 'primary.main',
        backgroundImage: tutor.avatar ? tutor.avatar : 'url(/image/background/tutor.jpg)',
        width: '100%',
        '&:hover': {
          boxShadow: 7,
        }
      }}
    >
      <Box
        sx={{
          width: 'calc(100%-1rem)',
          bgcolor: '#fff',
          padding: 2,
          borderRadius: 2,
          borderTopRightRadius: 18,
          borderTopLeftRadius: 0,
        }}
      >
        <NavLink
          to={`/users/${tutor.id}/profile`}
        >
          <Box>
            <Box
              fontWeight="bold"
              fontSize="h6.fontSize"
            >
              {tutor.fullName}
            </Box>
            <Rating
              size="small"
              name={`${tutor.username}-overall-rating`}
              value={3.5}
            />
          </Box>
          <Box
            typography="caption"
            fontStyle="italic"
          >
            {tutor.email}
          </Box>
        </NavLink>
      </Box>
    </Box>
  );
}
 
export default SingleListTutor;
