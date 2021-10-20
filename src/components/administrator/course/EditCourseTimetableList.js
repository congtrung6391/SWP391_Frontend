import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { AdminCourseTimetableContext } from '../../../context/adminCourseTimetable.context';
import EditCourseTimetableSingleList from './EditCourseTimetableSingleList';

const EditCourseTimetableList = ({ day, courseId }) => {
  const timetableContext = useContext(AdminCourseTimetableContext);

  return (
    <Box>
      <Divider
        sx={{ pt: 2 }}
      />
      <Typography
        variant="h6"
        sx={{ py: 1 }}
      >
        {day.name}
      </Typography>
      {
        timetableContext.timetableList.map((timetable) => (
          timetable.day === day.id
            ? <EditCourseTimetableSingleList
                timetable={timetable}
                courseId={courseId}
              />
            : null
        ))
      }
    </Box>
  );
}

export default EditCourseTimetableList;