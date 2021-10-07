import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import EditCourseList from './EditCourseList';

const CoursePage = (props) => {
  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['courses', '/admin/course'],
        ]}
      />
      <Body>
        <Grid item md={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ pl: 2, mb: 2 }}
          >
            Course management
          </Typography>
          <EditCourseList />
        </Grid>
      </Body>
    </>
  );
}

export default CoursePage;
