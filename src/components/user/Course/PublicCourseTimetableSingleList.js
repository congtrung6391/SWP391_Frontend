import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import moment from 'moment';

const PublicCourseTimetableSingleList = ({ timetable }) => {

  return (
    <Box
      sx={{
        display: "inline-block"
      }}
    >
      <Box
        className="admin-timetable-single-list"
        display="flex"
        flexDirection="row"
        sx={{
          py: '0.25rem',
          px: 2,
          mr: 2,
          mb: 1,
          borderRadius: 5,
          border: 2,
          borderColor: 'primary.main',
        }}
      >
        <Typography>
          {`${moment(timetable.startTime, 'hh:mm:ss').format('hh:mm')} - ${moment(timetable.endTime, 'hh:mm:ss').format('hh:mm')}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default PublicCourseTimetableSingleList;
