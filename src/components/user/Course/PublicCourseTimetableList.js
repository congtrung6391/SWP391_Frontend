import React from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import EditCourseTimetableSingleList from './PublicCourseTimetableSingleList';

const PublicCourseTimetableList = ({ divider, day, timetableList }) => {
  return (
    <Box>
      {
        divider && (
          <Divider
            sx={{ pt: 2 }}
          />
        )
      }
      <Typography
        variant="h6"
        sx={{ py: 1 }}
      >
        {day.name}
      </Typography>
      {
        timetableList.map((timetable) => (
          timetable.day === day.id
            ? <EditCourseTimetableSingleList
                timetable={timetable}
              />
            : null
        ))
      }
    </Box>
  );
}

export default PublicCourseTimetableList;