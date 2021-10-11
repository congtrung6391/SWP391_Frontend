import React, { useContext } from 'react';
import { CourseContext } from '../../../context/course.context';
import {
  Grid,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import PublicCourseSingleList from './PublicCourseSingleList';

const PublicCourseList = (props) => {
  const courseContext = useContext(CourseContext);

  return (
    <Grid
      container
    >
      {
        courseContext.courseList.map((course) => (
          <Grid
            key={course.id}
            md={4}
            xs={6}
            sx={{
              padding: '0.35rem',
            }}
          >
            <NavLink
              to={`/courses/${course.id}`}
            >
              <PublicCourseSingleList
                course={course}
              />
            </NavLink>
          </Grid>
        ))
      }
    </Grid>
  );
}

export default PublicCourseList;
