import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  ButtonGroup,
  Typography,
  InputLabel,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PublicIcon from '@mui/icons-material/Public';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoadingDNA3X } from '../../common/Loading';
import URLService from '../../../services/URL.service';
import { ToastContext } from '../../../context/toast.context';
import MuiSearch from '../../common/MuiSearch';
import { AdminCourseContext } from '../../../context/adminCourse.context';
import { SubjectContext } from '../../../context/subject.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import { NavLink } from 'react-router-dom';

const ListUsers = () => {
  const courseContext = useContext(AdminCourseContext);
  const toastContext = useContext(ToastContext);
  const subjectContext = useContext(SubjectContext);
  const { verifyAdministrator, verifyTutor } = useContext(AuthenticationContext);
  const [fetched, setFetched] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchSubjectId, setSearchSubjectId] = useState('');
  const [searchCourseId, setSearchCourseId] = useState(null);
  const [searchTutorName, setSearchTutorName] = useState('');
 
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberofPages] = useState(1);

  const fetchCourseList = async () => {
    setFetched(false);
    try {
      const setting = URLService.getAllQueryString();
      setting.key = setting.search;
      const { totalCourse } = await courseContext.getCourseList({
        courseName: searchName,
        page,
        subjectId: searchSubjectId,
        id: searchCourseId, 
        tutorName: searchTutorName,
      });
      setFetched(true);
      setNumberofPages(Math.ceil((totalCourse) / courseContext.limit));
    } catch (error) {
      setFetched(true);
    }
  };

  useEffect(() => {
    fetchCourseList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPageChange = (event, value) => {
    setPage(value);
  }

  const onChangeSubject = (event) => {
    setSearchSubjectId(event.target.value);
  }

  const onDeleteCourse = async (id) => {
    if (window.confirm('This action cannot be undo, are you sure?')) {
      const response = await courseContext.deleteCourse(id);
      if (response === null) {
        toastContext.addNotification('Delete course success');
      } else {
        toastContext.addNotification('Delete course failed', response, 'error');
      }
    }
  }

  const onPublicCourse = async (course) => {
    if (!verifyAdministrator()) {
      toastContext.addNotification('Toggle public course failed', 'You are not allowed to perform this action.', 'error');
      return;
    }
    const response = await courseContext.publicCourse(course.id, course.courseStatus ? false : true);
    if (response === null) {
      toastContext.addNotification('Toggle public course success');
    } else {
      toastContext.addNotification('Toggle public course failed', response, 'error');
    }
  }

  const onReplyRegister = async (course, action) => {
    const response = await courseContext.replyRegister(course.id, action, course);
    if (response === null) {
      toastContext.addNotification('Action success');
    } else {
      toastContext.addNotification('Action failed', 'Cannot perform action', 'error');
    }
  }

  useEffect(() => {
    fetchCourseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    setPage(1);
    fetchCourseList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchSubjectId])

  const onSearch = () => {
    setPage(1);
    fetchCourseList();
  };

  return (
    <Box>
      <Box
        sx={{ mb: 2 }}
      >
        <ButtonGroup sx={{ mr: 1 }}>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            variant="contained"
            color="secondary"
          >
            <NavLink to="/admin/courses/add">
              Add new
            </NavLink>
          </Button>
          <Button
            disableFocusRipple
            disableRipple
            disableElevation
            variant="contained"
            color="primary"
          >
            {`Total courses: ${courseContext.totalCourse}`}
          </Button>
        </ButtonGroup>
      </Box>
      <Box mb={1} display="flex" flexDirection="row">
        <Box sx={{ mr: 1 }}>
          <FormControl>
            <Select
              id="select-subject"
              label="Subject"
              value={searchSubjectId || 0}
              onChange={(event) => onChangeSubject(event)}
              sx={{
                minWidth: '8.5rem',
                px: 1,
                lineHeight: '2rem',
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1
              }}
              variant="standard"
            >
              <MenuItem key={0} value={0}>All subject</MenuItem>
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
        </Box>
        <Box sx={{ mr: 1 }}>
          <MuiSearch
            label="Course Id"
            placeholder="Search Course Id"
            value={searchCourseId}
            onChange={(event) => setSearchCourseId(event.target.value)}
            onSearch={onSearch}
          />
        </Box>
        <Box sx={{ mr: 1 }}>
          <MuiSearch
            label="Tutor name"
            placeholder="Tutor name"
            value={searchTutorName}
            onChange={(event) => setSearchTutorName(event.target.value)}
            onSearch={onSearch}
          />
        </Box>
        <Box flexGrow={1} sx={{ mr: 1 }}>
          <MuiSearch
            label="Course name"
            placeholder="Search Course name"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
            onSearch={onSearch}
          />
        </Box>
        <Button
          variant="contained"
          onClick={onSearch}
        >
          Search
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText' }}>Id</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Title</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Tutor</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Student</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Subject</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Learning</TableCell>
              {
                verifyTutor() && (
                  <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Approve/Reject</TableCell>
                )
              }
              {
                verifyTutor() && (
                  <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Toggle Public</TableCell>
                )
              }
              {
                verifyTutor() && (
                  <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Delete</TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fetched
                ? (
                  courseContext.courseList.map((course, index) => (
                    <TableRow compnent={NavLink} key={course.id}>
                      <TableCell>
                        <NavLink to={`${verifyTutor() ? '/admin' : ''}/courses/${verifyTutor() ? 'edit/' : ''}${course.id}`}>
                          {course.id}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <NavLink to={`${verifyTutor() ? '/admin' : ''}/courses/${verifyTutor() ? 'edit/' : ''}${course.id}`}>
                          {course.courseName}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <NavLink to={`${verifyTutor() ? '/admin' : ''}/courses/${verifyTutor() ? 'edit/' : ''}${course.id}`}>
                          <Typography
                            noWrap
                            sx={{ maxWidth: '8rem' }}
                          >
                            {course.tutor.email}
                          </Typography>
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <NavLink to={`${verifyTutor() ? '/admin' : ''}/courses/${verifyTutor() ? 'edit/' : ''}${course.id}`}>
                          <Typography
                            noWrap
                            sx={{ maxWidth: '8rem' }}
                          >
                            {course.student ? course.student.email : 'No student'}
                          </Typography>
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <NavLink to={`${verifyTutor() ? '/admin' : ''}/courses/${verifyTutor() ? 'edit/' : ''}${course.id}`}>
                          {course.subject.subjectName}
                        </NavLink>
                      </TableCell>
                      <TableCell align="center">
                        <MenuBookIcon
                          color={!course.learningStatus ? 'error' : 'success'}
                        />
                      </TableCell>
                      {
                        verifyTutor() && (
                          <TableCell align="center">
                            <ButtonGroup variant="contained" size="small">
                              <Button
                                color="success"
                                onClick={() => onReplyRegister(course, true, course)}
                              >
                                <CheckCircleOutlineIcon />
                              </Button>
                              <Button
                                color="error"
                                onClick={() => onReplyRegister(course, false, course)}
                              >
                                <HighlightOffIcon />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        )
                      }
                      {
                        verifyTutor() && (
                          <TableCell align="center">
                            <IconButton onClick={() => onPublicCourse(course)}>
                              <PublicIcon color={course.publicStatus ? 'success' : 'warning'} />
                            </IconButton>
                          </TableCell>
                        )
                      }
                      {
                        verifyTutor() && (
                          <TableCell align="center">
                            <IconButton onClick={() => onDeleteCourse(course.id)}>
                              <DeleteForeverIcon color="error" />
                            </IconButton>
                          </TableCell>
                        )
                      }
                      </TableRow> 
                  ))
                )
                : (
                  <TableRow style={{ overflow: 'hidden' }}>
                    <TableCell colSpan={9} style={{  overflow: 'hidden' }}>
                      <LoadingDNA3X />
                    </TableCell>
                  </TableRow>
                )
            }
            {
              fetched && courseContext.courseList.length === 0 && (
                <TableRow style={{ overflow: 'hidden' }}>
                    <TableCell colSpan={9} style={{  overflow: 'hidden', textAlign: 'center' }}>
                      No result
                    </TableCell>
                  </TableRow>
              )
            }
          </TableBody>
        </Table>
        <Box py={1} display="flex" flexDirection="row" justifyContent="center">
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={onPageChange}
            color="primary"
            sx={{ justifyContent: 'center' }}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default ListUsers;
