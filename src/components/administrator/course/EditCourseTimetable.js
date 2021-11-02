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
  Chip,
} from '@mui/material';
import { AdminCourseTimetableContext } from '../../../context/adminCourseTimetable.context';
import { ToastContext } from '../../../context/toast.context';
import { LoadingDNA3X, Loading } from '../../common/Loading';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import EditCourseTimetableList from './EditCourseTimetableList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditCourseTimetable = ({ course }) => {
  const [fetched, setFetched] = useState(false);
  const [adding, setAdding] = useState(false);

  const timetableContext = useContext(AdminCourseTimetableContext);
  const toastContext = useContext(ToastContext);

  const [day, setDay] = useState([]);
  const onChangeDay = (event) => {
    const {
      target: { value },
    } = event;
    setDay(
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  
  const [start, setStart] = useState();
  const onChangeStart = (newValue) => {
    setStart(newValue);
    if (!end || moment.duration(new moment(end).subtract(newValue)).asHours() < 1) {
      setEnd(new moment(newValue).add(1, 'hours'));
    }
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

    if (day.length === 0) {
      toastContext.addNotification('Error', 'Please select a day.', 'error');
      setAdding(false);
      return;
    }

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

    day.forEach(async (d) => {
      const data = {};
      data.day = d.id;
      data.startTime = start.format('hh:mm:ss');
      data.endTime = end.format('hh:mm:ss');
  
      const response = await timetableContext.addTimetable(course.id, data);
      if (typeof response === 'string') {
        toastContext.addNotification('Failed', 'Add Timetable failed', 'error');
      } else {
        toastContext.addNotification('Success', 'Add Timetable success');
      }
    })

    setAdding(false);
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
        <Typography
        >
          Minumum time is 1 hour
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
              multiple
              labelId="select-day"
              value={day || []}
              onChange={onChangeDay}
              sx={{ minWidth: '8.5rem' }}
              renderValue={(selected) => {
                console.log(selected)
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {
                      selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))
                    }
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              {
                timetableContext.dayInWeek.map((d) => (
                  <MenuItem key={d.name} value={d}>{d.name}</MenuItem>
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
        <Box>
          <Button
            variant="contained"
            onClick={onAddTimetable}
            disabled={adding}
            sx={{ height: '3.5rem' }}
          >
            Add
            {
              adding && (<Loading />)
            }
          </Button>
        </Box>
      </Box>
      {
        fetched 
          ? (
            timetableContext.dayInWeek.map((d) => (
              <EditCourseTimetableList
                day={d}
                courseId={course.id}
              />
            ))
          )
          : (
            <LoadingDNA3X />
          )
      }
    </Paper>
  );
}

export default EditCourseTimetable;
