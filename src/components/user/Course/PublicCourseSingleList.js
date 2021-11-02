import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { CourseContext } from '../../../context/course.context';
import { Loading } from '../../common/Loading';
import { NavLink } from 'react-router-dom';
import { ToastContext } from '../../../context/toast.context';

const PublicCourseSingleList = ({ course }) => {
  const courseContext = useContext(CourseContext);
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

  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        height: '14rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bgcolor: 'primary.main',
        width: '100%',
        backgroundImage: `url(/image/background/${course.subject.subjectName}.jpg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        '&:hover': {
          boxShadow: 7,
        },
      }}
    >
      <Box
        sx={{
          width: 'calc(100%-1rem)',
          bgcolor: '#fff',
          padding: 2,
          borderRadius: 2,
          borderTopRightRadius: 18,
          borderTopLeftRadius: 0,
        }}
      >
        <NavLink
          to={`/courses/${course.id}`}
        >
          <Box>
            <Typography
              fontWeight="bold"
              fontSize="h6.fontSize"
              noWrap
            >
              {course.courseName}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Box
              typography="caption"
              fontStyle="italic"
            >
              {course.tutor.fullName}
            </Box>
            <Box>
              <Box
                typography="caption"
                fontStyle="italic"
                fontWeight="bold"
                sx={{
                  border: 2,
                  borderRadius: 3,
                  px: 1,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                }}
              >
                {course.subject.subjectName}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ my: 1 }}
          >
            <Typography
              noWrap
            >
              {course.courseDescription && course.courseDescription.substring(0, Math.min(course.courseDescription.length, 50))}
            </Typography>
          </Box>
        </NavLink>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            typography="body1"
            fontWeight="bold"
            fontStyle="italic"
            textAlign="center"
          >
            {`${Math.floor(parseInt(course.cost, 10)/1000)}K/${course.length}'`}
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 50 }}
              onClick={onRegisterCourse}
              disabled={registering}
            >
              Register
              {
                registering && (<Loading />)
              }
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
 
export default PublicCourseSingleList
