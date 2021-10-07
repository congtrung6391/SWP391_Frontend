import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { AdminCourseContext } from '../../../context/adminCourse.context';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';

const EditCoursePage = (props) => {
  const [fetched, setFetched] = useState(false);
  const [course, setCourse] = useState({});
  const [mode, setMode] = useState('add');

  const courseContext = useContext(AdminCourseContext);

  const fetchCourse = async () => {
    setFetched(false);
    const courseId = props.match.params.id;
    await courseContext.getCourse(courseId);
    setCourse(courseContext.course);
    setFetched(true);
  };

  useEffect(() => {
    setMode(props.match.path.split('/')[3]);
    if (mode === 'edit') {
      fetchCourse();
    }
  }, [])

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['courses', '/admin/course'],
          ['Add']
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
          {/* <EditCourseList /> */}
        </Grid>
      </Body>
    </>
  );
}

export default EditCoursePage;
