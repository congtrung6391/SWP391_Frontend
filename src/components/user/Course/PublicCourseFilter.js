import { Box, TextField, Slider, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { CourseContext } from '../../../context/course.context';
import { SubjectContext } from '../../../context/subject.context';
import MuiSearch from '../../common/MuiSearch';

const PublicCourseFilter = (props) => {
  const { onGetCourseList } = props;
  const subjectContext = useContext(SubjectContext);
  const [subjectId, setSubjectId] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [minCost, setMinCost] = useState(null);
  const [maxCost, setMaxCost] = useState(null);
  const [minLength, setMinLength] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [tutorName, setTutorName] = useState('');

  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const onFiler = () => {
    onGetCourseList({
      page: 1,
      subjectId,
      courseName,
      minCost: minCost ? minCost + '000' : null, 
      maxCost: maxCost ? maxCost + '000' : null,
      minLength,
      maxLength,
      tutorName,
    })
  };

  return (
    <Box
      sx={{
        p: 2,
        border: 3,
        borderColor: 'primary.main',
        borderRadius: 3,
      }}
    >
      <Box>
        <MuiSearch
          label="Search course name"
          value={courseName}
          onChange={(event) => setCourseName(event.target.value)}
          onSearhc={onFiler}
        />
      </Box>
      <Box
        sx={{ mt: 2 }}
      >
        <MuiSearch
          label="Search Tutor name"
          value={tutorName}
          onChange={(event) => setTutorName(event.target.value)}
          onSearhc={onFiler}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ mt: 2 }}
      >
        <Typography gutterBottom>
          Cost range - thousand VND
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 1 }}
        >
          <TextField
            label="Min Cost"
            value={minCost || ''}
            onChange={(event) => setMinCost(event.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            label="Max Cost"
            value={maxCost || ''}
            onChange={(event) => setMaxCost(event.target.value)}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ mt: 2 }}
      >
        <Typography gutterBottom>
          Length range - minutes
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          sx={{ mt: 1 }}
        >
          <TextField
            label="Min length"
            value={minLength || ''}
            onChange={(event) => setMinLength(event.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            label="Max length"
            value={maxLength || ''}
            onChange={(event) => setMaxLength(event.target.value)}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ mt: 2 }}
      >
        <FormControl
          sx={{ flexGrow: 1 }}
        >
          <InputLabel id="select-subject">Subject</InputLabel>
          <Select
            id="select-subject"
            label="Subject"
            value={subjectId || 0}
            onChange={(event) => onChangeSubject(event)}
            sx={{ minWidth: '8.5rem', height: '2.5rem' }}
          >
            <MenuItem
              value={0}
            >
              All subjects
            </MenuItem>
            {
              subjectContext.subjects.map((subject) => (
                <MenuItem
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.subjectName}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={onFiler}
          sx={{ ml: 1}}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default PublicCourseFilter;
