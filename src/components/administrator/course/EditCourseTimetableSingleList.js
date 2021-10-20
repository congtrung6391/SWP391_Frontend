import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdminCourseTimetableContext } from '../../../context/adminCourseTimetable.context';
import { ToastContext } from '../../../context/toast.context';
import { LocalizationProvider, TimePicker } from '@mui/lab';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const EditCourseTimetableSingleList = ({ timetable, courseId }) => {
  const timetableContext = useContext(AdminCourseTimetableContext);
  const toastContext = useContext(ToastContext);

  const [editting, setEditting]  = useState(false);

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

  const onUpdateTimetable = async (mid) => {
    const data = {};
    if (day && day !== timetable.day) {
      data.day = day;
    }
    if (start && start !== timetable.startTime) {
      data.startTime = start.format('hh:mm:ss');
    }
    if (end && end !== timetable.endTime) {
      data.endTime = end.format('hh:mm:ss');
    }

    const response = await timetableContext.updateTimetable(courseId, mid, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Update Timetable failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Update Timetable success');
    }

    setEditting(false);
  }

  const onDeleteTimetable = async (mid) => {
    const response = await timetableContext.deleteTimetable(courseId, mid);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Delete Timetable failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Delete Timetable success');
    }
  }

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
        <Box className="control-button">
          <IconButton
            sx={{
              p: 0,
              pl: 1,
            }}
            onClick={() => setEditting(true)}
          >
            <EditIcon color="secondary" fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              p: 0,
              pl: 1,
            }}
            onClick={() => onDeleteTimetable(timetable.id)}
          >
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        onClose={() => setEditting(false)}
        open={editting}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Timetable</DialogTitle>
        <DialogContent>
          <Box flexGrow={1} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="select-day">Day</InputLabel>
              <Select
                id="select-day"
                label="Grade"
                value={day || timetable.day}
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
          <Box
            display="flex"
            flexDirection="row"
            mt={2}
          >
            <LocalizationProvider
              dateAdapter={MomentUtils}
            >
              <TimePicker
                ampm={false}
                label="Start"
                value={moment(start || timetable.startTime, 'hh:mm:ss')}
                onChange={onChangeStart}
                renderInput={(params) => <TextField {...params} sx={{ pr: 1 }} />}
              />
              <TimePicker
                ampm={false}
                label="End"
                value={moment(end || timetable.endTime, 'hh:mm:ss')}
                onChange={onChangeEnd}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            onClick={() => onUpdateTimetable(timetable.id)}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EditCourseTimetableSingleList;
