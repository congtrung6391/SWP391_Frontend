import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
} from '@mui/material';
import { AdminCourseTimetableContext } from '../../../context/adminCourseTimetable.context';
import AdminCourseTimetableService from '../../../services/adminCourseTimetable.service';
import { LoadingDNA3X } from '../../common/Loading';
import PublicCourseTimetableList from './PublicCourseTimetableList';

const PublicCourseTimetable = ({ course }) => {
  const [timetableList, setTimetableList] = useState([]);
  const timetableContext = useContext(AdminCourseTimetableContext);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchMatrialList = async () => {
      setFetched(false);
      const timetableList = await AdminCourseTimetableService.getTimetableList(course.id);
      setTimetableList(timetableList)
      setFetched(true);
    }
    fetchMatrialList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Box
      sx={{
        py: 1,
        px: 3,
        border: 3,
        borderTop: 0,
        borderColor: 'primary.main',
      }}
    >
      {
        fetched
          ? (
            timetableContext.dayInWeek.map((day, index) => (
              <PublicCourseTimetableList
                timetableList={timetableList}
                day={day}
                divider={index !== 0}
              />
            ))
          )
          : (
            <LoadingDNA3X />
          )
      }
    </Box>
  )
};

export default PublicCourseTimetable;