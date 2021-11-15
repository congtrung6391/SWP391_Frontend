import {
  Grid,
  Typography,
  Box,
  Avatar,
  Tab,
  Tabs,
  Button,
} from '@mui/material';
import {
  useTheme,
  alpha,
} from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../../context/course.context';
import { ToastContext } from '../../../context/toast.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import Body from '../../basic/Body';
import Page404 from '../../common/404';
import { Loading, LoadingPage } from '../../common/Loading';
import NavigationBar from '../../common/NavigationBar';
import PublicCourseInfor from './PublicCourseInfo';
import PublicCourseMaterialList from './PublicCourseMaterialList';
import PublicCourseTimetable from './PublicCourseTimetable';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

const PublicCoursePage = (props) => {
  const { verifyUser } = useContext(AuthenticationContext);
  const courseContext = useContext(CourseContext);
  const [fetched, setFetched] = useState(false); 
  const [course, setCourse] = useState({});
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const toastContext = useContext(ToastContext);
  const [registering, setRegistering] = useState(false);

  const onRegisterCourse = async () => {
    setRegistering(true);
    const response = await courseContext.register(course.id);
    if (typeof response === 'string') {
      toastContext.addNotification("Error", "Registration falied", 'error');
    } else {
      toastContext.addNotification('Success', 'Register success');
    }
    setRegistering(false);
  }

  const onChangeTab = (event, newValue) => {
    setTab(newValue);
  }

  const a11yProps = (index) => {
    return {
      id: `public-course-tab-${index}`,
      'aria-controls': `public-course-tab-${index}`,
    };
  }

  useEffect(() => {
    const fetchCourse = async () => {
      setFetched(false);
      const auth = verifyUser();
      const id = props.match.params['cid'];
      const newCourse = await courseContext.getCourse(id, !!auth);
      setCourse(newCourse);
      setFetched(true);
    }
    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },  [])

  if (!fetched) return <LoadingPage />

  if (!course) return <Page404 />

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Courses', '/courses'],
          [course.courseName || ''],
        ]}
      />
      <Body>
        <Grid item md={12} xs={12}>
          <Box
            sx={{
              border: 3,
              borderBottom: 1,
              borderColor: 'primary.main',
              backgroundImage: `url(/image/background/${course.subject.subjectName}.jpg)`,
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              borderTopLeftRadius: 5,
              borderTopRightRadius: 25,
              position: 'relative',
              mt: 7,
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              flexWrap="wrap"
              sx={{
                minHeight: '10.8rem',
                width: '100%',
                backdropFilter: 'brightness(45%)',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 25,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                alignItems="center"
                sx={{
                  height: '100%',
                  minWidth: '13.25rem',
                  minHeight: '10.8rem',
                }}
              >
                <Avatar 
                  src={course.tutor.avatar}
                  sx={{
                    width: '10rem',
                    height: '10rem',
                    border: 5,
                    borderColor: 'primary.main',
                    position: 'absolute',
                    left: 20,
                    top: '-3rem',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    px: 2,
                    borderRadius: 4,
                    color: alpha("#fff", 0.9),
                  }}
                >
                  {course.tutor.fullName}
                </Typography>
              </Box>
              <Box
                flexGrow={1}
                display='flex'
                flexDirection="column"
                justifyContent="space-between"
                flexWrap="wrap"
                alignItems="center"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                >
                  <Typography
                    textAlign="center"
                    variant="h5"
                    sx={{
                      fontWeight: 500,
                      mt: 3,
                      mb: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 10,
                      color: alpha("#fff", 0.9),
                    }}
                  >
                    {course.courseName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      border: 2,
                      borderRadius: 10,
                      mt: 4,
                      mb: 2,
                      ml: 1,
                      px: 2,
                      py: 1,
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      fontStyle: "italic",
                      fontWeight: "bold"
                    }}
                  >
                    {course.subject.subjectName}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color={course.registered ? "error" : "success"}
                  sx={{ borderRadius: 50 }}
                  onClick={course.registered ? null : onRegisterCourse}
                  disabled={registering}
                >
                  {
                    course.registered
                      ? 'Registered'
                      : 'Register'
                  }
                  {
                    registering && (<Loading />)
                  }
                </Button>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Tabs
                    value={tab}
                    onChange={onChangeTab}
                    aria-label="public-course-tab"
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab sx={{ fontWeight: "bold", color: alpha("#fff", 0.9) }} label="Overview" {...a11yProps(0)} />
                    <Tab sx={{ fontWeight: "bold", color: alpha("#fff", 0.9) }} label="Material" {...a11yProps(1)} />
                    <Tab sx={{ fontWeight: "bold", color: alpha("#fff", 0.9) }} label="Available Time" {...a11yProps(2)} />
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <TabPanel value={tab} index={0}>
              <PublicCourseInfor
                course={course}
              />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <PublicCourseMaterialList
                course={course}
              />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <PublicCourseTimetable
                course={course}
              />
            </TabPanel>
          </Box>
        </Grid>
      </Body>
    </>
  );
}

export default PublicCoursePage;