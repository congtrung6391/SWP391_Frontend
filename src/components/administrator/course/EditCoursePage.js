import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AdminCourseContext } from '../../../context/adminCourse.context';
import NavigationBar from '../../common/NavigationBar';
import Body from '../../basic/Body';
import { LoadingPage } from '../../common/Loading';
import Page404 from '../../common/404';
import { Box } from '@mui/system';
import SideTabControl from '../../basic/SideTabControl/SideTabControl';
import SideTabContent from '../../basic/SideTabControl/SideTabContent';
import EditCourseInformation from './EditCourseInformation';

const EditCoursePage = (props) => {
  const [fetched, setFetched] = useState(false);
  const [course, setCourse] = useState({});

  const courseContext = useContext(AdminCourseContext);

  const fetchCourse = async () => {
    setFetched(false);
    const courseId = parseInt(props.match.params.id, 10);
    const newCourse = await courseContext.getCourse(courseId);
    setCourse(newCourse);
    setFetched(true);
  };

  useEffect(() => {
    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fetched) {
    return <LoadingPage />
  }

  if (fetch && !courseContext.course) {
    return <Page404 />
  }

  return (
    <>
      <NavigationBar
        nav={[
          ['admin', '/admin'],
          ['courses', '/admin/course'],
          [course.courseName || ''],
        ]}
      />
      <Body>
        <Grid item md={10} xs={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ pl: 2, mb: 2 }}
          >
            {course.courseName}
          </Typography>
          <Box display="flex" flexDirection="row">
            <SideTabControl
              childClassName="edit-course-sidetab"
              activeClassName="active-tab"
              controlKey="editcourse-view"
            >
              <Typography className="text-vertical" route="info" key="info">
                Infromation
                &nbsp;
                <AssignmentIcon fontSize="small" />
              </Typography>
              <Typography className="text-vertical" route="time" key="time">
                Available Time
                &nbsp;
                <TimelapseIcon fontSize="small" />
              </Typography>
              <Typography className="text-vertical" route="material" key="material">
                Material
                &nbsp;
                <CloudDownloadIcon fontSize="small" />
              </Typography>
            </SideTabControl>
            <SideTabContent controlKey="editcourse-view">
              <Box route="info" flexGrow={1}>
                <EditCourseInformation
                  course={course}
                />
              </Box>
            </SideTabContent>
          </Box>
        </Grid>
      </Body>
    </>
  );
}

export default EditCoursePage;
