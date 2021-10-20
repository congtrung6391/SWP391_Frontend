import React, { useState, useContext, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { AdminCourseTimetableContext } from '../../../context/adminCourseTimetable.context';
import { ToastContext } from '../../../context/toast.context';
import { LoadingDNA3X, Loading } from '../../common/Loading';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import EditCourseTimetableList from './EditCourseTimetableList';

const EditCourseTimetable = ({ course }) => {
  const [fetched, setFetched] = useState(false);
  const [adding, setAdding] = useState(false);

  const timetableContext = useContext(AdminCourseTimetableContext);
  const toastContext = useContext(ToastContext);

  const [day, setDay] = useState(2);
  const onChangeDay = (event) => {
    setDay(event.target.value);
  }
  
  const [start, setStart] = useState();
  const onChangeStart = (newValue) => {
    setStart(newValue);
  }

  const [end, setEnd] = useState();
  const onChangeEnd = (newValue) => {
    setEnd(newValue);
  }

  useEffect(() => {
    const fetchMatrialList = async () => {
      setFetched(false);
      await timetableContext.getTimetableList(course.id);
      setFetched(true);
    }
    fetchMatrialList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAddTimetable = async () => {
    setAdding(true);
    if (!start || !end) {
      toastContext.addNotification('Error', 'Please select start time and end time.', 'error');
      setAdding(false);
      return;
    }

    if (moment.duration(new moment(end).subtract(start)).asHours() < 1) {
      toastContext.addNotification('Error', 'Duration must be at least 1 hour.', 'error');
      setAdding(false);
      return;
    }

    const data = {};
    data.day = day || 2;
    data.startTime = start.format('hh:mm:ss');
    data.endTime = end.format('hh:mm:ss');

    const response = await timetableContext.addTimetable(course.id, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Add Timetable failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Add Timetable success');
    }

    setAdding(false);
  }

  if (!fetched) {
    return <LoadingDNA3X />;
  }

  return (
    <Paper
      sx={{
        px: 2,
        py: 2,
        border: 2,
        borderColor: 'primary.main',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '23rem',
      }}
      variant='outlined'
    >
      <Box
        sx={{ pb: 2 }}
      >
        <Typography
          variant="h6"
        >
          Add New Available Time
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
      >
        <Box flexGrow={1} sx={{ pr: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="select-day">Day</InputLabel>
            <Select
              id="select-day"
              label="Grade"
              value={day || 2}
              onChange={onChangeDay}
              sx={{ minWidth: '8.5rem' }}
            >
              {
                timetableContext.dayInWeek.map((d) => (
                  <MenuItem key={d.name} value={d.id}>{d.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <LocalizationProvider dateAdapter={MomentUtils}>
          <TimePicker
            ampm={false}
            label="Start"
            value={start}
            onChange={onChangeStart}
            renderInput={(params) => <TextField {...params} sx={{ pr: 1 }} />}
          />
          <TimePicker
            ampm={false}
            label="End"
            value={end}
            onChange={onChangeEnd}
            renderInput={(params) => <TextField {...params} sx={{ pr: 1 }}  />}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          onClick={onAddTimetable}
          disabled={adding}
        >
          Add
          {
            adding && (<Loading />)
          }
        </Button>
      </Box>
      {
        timetableContext.dayInWeek.map((d) => (
          <EditCourseTimetableList
            day={d}
            courseId={course.id}
          />
        ))
      }
    </Paper>
  );
}

export default EditCourseTimetable;
