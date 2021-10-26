import React, { useContext, useState, useEffect } from 'react';
import { CourseContext } from '../../../context/course.context';
import {
  Grid, Pagination, Box,
} from '@mui/material';
// import { NavLink } from 'react-router-dom';
import PublicCourseSingleList from './PublicCourseSingleList';

const PublicCourseList = (props) => {
  const courseContext = useContext(CourseContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  };

  useEffect(() => {
    setTotalPage(Math.ceil(courseContext.totalCourse/courseContext.limit));
  }, [courseContext]);

  useEffect(() => {

  }, [page])

  return (
    <Grid
      container
    >
      {
        courseContext.courseList.map((course) => (
          <Grid
            item
            key={course.id}
            md={4}
            xs={6}
            sx={{
              padding: '0.35rem',
            }}
          >
            <PublicCourseSingleList
              course={course}
            />
          </Grid>
        ))
      }
      <Grid
        item
        md={12}
        xs={12}
        sx={{ mt: 1 }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Pagination
            page={page}
            count={totalPage}
            color="primary"
            onChange={onChangePage}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PublicCourseList;
