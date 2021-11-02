import React, { useState, useContext } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AdminCourseContext } from '../../../context/adminCourse.context';
import { SubjectContext } from '../../../context/subject.context';
import { ToastContext } from '../../../context/toast.context';

const EditCourseInformation = (props) => {
  const [course, setCourse] = useState(props.course);
  const [costError, setCostError] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [saving, setSaving] = useState(false);

  const courseContext = useContext(AdminCourseContext);
  const subjectContext = useContext(SubjectContext);
  const toastContext = useContext(ToastContext);

  const onChangeTitle = (event) => {
    setCourse({ ...course, courseName: event.target.value });
  }

  const onChangeDescription = (event) => {
    setCourse({ ...course, courseDescription: event.target.value });
  }

  const onChangeSubject = (event) => {
    setCourse({ ...course, subjectId: event.target.value });
  }

  const onChangeGrade = (event) => {
    setCourse({ ...course, grade: event.target.value });
  }

  const validateCost = (cost) => {
    const costNumber = parseInt(cost, 10);
    if (costNumber > 2000000) {
      setCostError('Cost should not be greater than 2.000.000 VND')
    } else {
      setCostError('');
    }
  }

  const onChangeCost = (event) => {
    setCourse({ ...course, cost: event.target.value });
    validateCost(event.target.value);
  }

  const validateLength = (length) => {
    const lengthNumber = parseInt(length, 10);
    if (lengthNumber > 60 * 5) {
      setLengthError('Lession length should not be greater than 5 hours.')
    } else if (lengthNumber < 60) {
      setLengthError('Lession length should not be smaller than 1 hour.')
    } else {
      setLengthError('');
    }
  }

  const onChangeLength = (event) => {
    setCourse({ ...course, length: event.target.value });
    validateLength(event.target.value);
  }

  const onSaveCourse = async () => {
    setSaving(true);
    const response = await courseContext.updateCourse(course);
    if (typeof response === 'string') {
      toastContext.addNotification('Error', response, 'error');
    } else {
      toastContext.addNotification('Success');
    }
    setSaving(false);
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
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          type='text'
          label="Title"
          name="title"
          value={course.courseName || ''}
          onChange={onChangeTitle}
        />
      </Box>
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          maxRows={10}
          label="Descrtiption"
          name="description"
          value={course.courseDescription || ''}
          onChange={onChangeDescription}
        />
      </Box>
      <Box
        mb={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box flexGrow={1} mr={2}>
          <TextField
            fullWidth
            variant="outlined"
            type='number'
            label="Cost (VNĐ)"
            name="cost"
            value={course.cost || ''}
            onChange={onChangeCost}
            helperText={costError}
            error={!!costError}
          />
        </Box>
        <Box flexGrow={1}>
          <TextField
            fullWidth
            variant="outlined"
            type='number'
            label="Lession Length (Minutes)"
            name="legnth"
            value={course.length || ''}
            onChange={onChangeLength}
            helperText={lengthError}
            error={!!lengthError}
          />
        </Box>
      </Box>
      <Box
        mb={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box flexGrow={1} mr={2}>
          <FormControl fullWidth>
            <InputLabel id="select-grade">Grade</InputLabel>
            <Select
              id="select-grade"
              label="Grade"
              value={course.grade || 1}
              onChange={(event) => onChangeGrade(event)}
              sx={{ minWidth: '8rem' }}
            >
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <MenuItem key={g} value={g}>{`Grade ${g}`}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box flexGrow={1}>
          <FormControl fullWidth>
            <InputLabel id="select-subject">Subject</InputLabel>
            <Select
              id="select-subject"
              label="Subject"
              value={course.subjectId || course.subject.id || 1}
              onChange={(event) => onChangeSubject(event)}
              sx={{ minWidth: '8rem' }}
            >
              {
                subjectContext.subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>{subject.subjectName}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={onSaveCourse}
          disabled={saving}
        >
          Save
          &nbsp;
          <SaveIcon />
        </Button>
      </Box>
    </Paper>
  );
}

export default EditCourseInformation;
