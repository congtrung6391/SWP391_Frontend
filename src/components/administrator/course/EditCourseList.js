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
  InputLabel,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LoadingDNA3X } from '../../common/Loading';
import URLService from '../../../services/URL.service';
import { ToastContext } from '../../../context/toast.context';
import MuiSearch from '../../common/MuiSearch';
import { AdminCourseContext } from '../../../context/adminCourse.context';
import { SubjectContext } from '../../../context/subject.context';
import { NavLink } from 'react-router-dom';

const ListUsers = () => {
  const itemPerPage = 20;
  const courseContext = useContext(AdminCourseContext);
  const toastContext = useContext(ToastContext);
  const subjectContext = useContext(SubjectContext);
  const [fetched, setFetched] = useState(false);
  const [search, setSearch] = useState('');
  const [searchSubjectId, setSearchSubjectId] = useState('');
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberofPages] = useState(1);

  useEffect(() => {
    const { page: pageUrl, search: searchUrl } = URLService.getAllQueryString();
    setPage(Number(pageUrl) || 1);
    setSearch(searchUrl);
  }, [])

  const onPageChange = (event, value) => {
    setPage(value);
  }

  const fetchCourseList = async () => {
    try {
      const setting = URLService.getAllQueryString();
      setting.key = setting.search;
      await courseContext.getCourseList(search, page, itemPerPage);
      setFetched(true);
      setNumberofPages(Math.ceil(courseContext.totalUsers / itemPerPage));
    } catch (error) {
      setFetched(true);
    }
  };

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

  useEffect(() => {
    fetchCourseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search])

  // const refresh = async () => {
  //   setFetched(true);
  //   URLService.setQueryString('page', this.state.page);
  //   await fetchUsers();
  // }

  if (!fetched) {
    return <LoadingDNA3X />;
  }

  return (
    <Box>
      <Box mb={1} display="flex" flexDirection="row">
        <Button
          disableFocusRipple
          disableRipple
          disableElevation
          variant="contained"
          color="primary"
        >
          {`Total courses: ${courseContext.totalCourse}`}
        </Button>
        <Box flexGrow={1}>
          <MuiSearch />
        </Box>
        <FormControl>
          {/* <InputLabel id="select-subject">Subject</InputLabel> */}
          <Select
            id="select-subject"
            // label="Subject"
            value={searchSubjectId || 0}
            // onChange={(event) => onChangeSubject(event)}
            sx={{
              minWidth: '8.5rem',
              px: 1,
              lineHeight: '1.8rem',
              border: 1,
              borderColor: 'primary.main',
              borderRadius: 1
            }}
            variant="standard"
          >
            <MenuItem key={0} value={0}>All subject</MenuItem>
            {
              subjectContext.subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText' }}>#</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Title</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Tutor</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Student</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Subject</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Learning</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              courseContext.courseList.map((course, index) => (
                <TableRow compnent={NavLink} key={course.id}>
                  <TableCell>
                    <NavLink to={`/admin/course/edit/${course.id}`}>
                      {index + 1}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/admin/course/edit/${course.id}`}>
                      {course.courseName}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/admin/course/edit/${course.id}`}>
                      {course.tutor.username}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/admin/course/edit/${course.id}`}>
                      {course.student ? course.student.username : 'No student'}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/admin/course/edit/${course.id}`}>
                      {course.subject}
                    </NavLink>
                  </TableCell>
                  <TableCell align="center">
                    <MenuBookIcon
                      color={course.courseStatus ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onDeleteCourse(course.id)}>
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Box py={1} display="flex" flexDirection="row" justifyContent="center">
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={onPageChange}
            variant="outlined"
            color="primary"
            sx={{ justifyContent: 'center' }}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default ListUsers;
