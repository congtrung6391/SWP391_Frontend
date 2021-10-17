import { Box, TextField, Slider, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React, { useState, useContext } from 'react';
import { CourseContext } from '../../../context/course.context';
import { SubjectContext } from '../../../context/subject.context';
import MuiSearch from '../../common/MuiSearch';

const PublicCourseFilter = (props) => {
  const courseContext = useContext(CourseContext);
  const subjectContext = useContext(SubjectContext);
  const [costRange, setCostRange] = useState([0, 2000]);
  const [lengthRange, setLengthRange] = useState([0, 300]);
  const [subjectId, setSubjectId] = useState(0);

  const onCostChange = (event, newValue) => {
    setCostRange(newValue);
  }

  const costText = (value) => {
    return `${value}k VND`;
  }

  const onLengthChange = (event, newValue) => {
    setLengthRange(newValue);
  }

  const lengthText = (value) => {
    return `${20000 * value} minutes`;
  }

  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const reloadCourseList = () => {

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
      <Box
        sx={{ pb: 1 }}
      >
        <MuiSearch />
      </Box>
      <Box
        sx={{ px: 1 }}
      >
        <Typography gutterBottom>
          Cost range
        </Typography>
        <Slider
          size="small"
          getAriaLabel={() => 'cost range'}
          value={costRange}
          onChange={onCostChange}
          valueLabelDisplay="auto"
          getAriaValueText={costText}
          max={2000}
          min={0}
          step={50}
        />
      </Box>
      <Box
        sx={{ pb: 1, px: 1 }}
      >
        <Typography gutterBottom>
          Length range
        </Typography>
        <Slider
          size="small"
          getAriaLabel={() => 'Legnth range'}
          value={lengthRange}
          onChange={onLengthChange}
          valueLabelDisplay="auto"
          getAriaValueText={lengthText}
          max={300}
          min={0}
          step={10}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
      >
        <FormControl
          sx={{ flexGrow: 1 }}
        >
          <InputLabel id="select-subject">Subject</InputLabel>
          <Select
            id="select-subject"
            label="Subject"
            value={subjectId}
            onChange={(event) => onChangeSubject(event)}
            sx={{ minWidth: '8.5rem', height: '2.5rem' }}
          >
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
          onClick={reloadCourseList}
          sx={{ ml: 1}}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default PublicCourseFilter;
