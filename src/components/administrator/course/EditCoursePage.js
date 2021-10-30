import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Icon,
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
import EditCourseMaterial from './EditCourseMaterial';
import EditCourseTimetable from './EditCourseTimetable';

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
          ['courses', '/admin/courses'],
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
          <Box display="flex" flexDirection="column">
            <SideTabControl
              childClassName="edit-course-sidetab"
              activeClassName="active-tab"
              controlKey="editcourse-view"
              direction="row"
            >
              <Typography className="text-vertical" variant="h6" route="info" key="info">
                Infromation
                &nbsp;
                <Icon>
                  <AssignmentIcon />
                </Icon>
              </Typography>
              <Typography className="text-vertical"  variant="h6" route="time" key="time">
                Available Time
                &nbsp;
                <Icon>
                  <TimelapseIcon />
                </Icon>
              </Typography>
              <Typography className="text-vertical" variant="h6" route="material" key="material">
                Material
                &nbsp;
                <Icon>
                  <CloudDownloadIcon />
                </Icon>
              </Typography>
            </SideTabControl>
            <SideTabContent controlKey="editcourse-view">
              <Box route="info" flexGrow={1}>
                <EditCourseInformation
                  course={course}
                />
              </Box>
              <Box route="material" flexGrow={1}>
                <EditCourseMaterial
                  course={course}
                />
              </Box>
              <Box route="time" flexGrow={1}>
                <EditCourseTimetable
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
