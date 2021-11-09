import { Paper, Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Pagination } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AdminCourseStudentContext } from '../../../context/AdminCourseStudent.context';
import { LoadingDNA3X } from '../../common/Loading';
import MuiSearch from '../../common/MuiSearch';
import EditCourseStudentSingleList from './EditCourseStudentSingleList';



const EdtiCourseStudent = (props) => {
  const { course } = props;
  const [fetched, setFetched] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  // const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  const studentContext = useContext(AdminCourseStudentContext);

  const fetchStudent = async () => {
    setFetched(false);
    const { totalStudent } = await studentContext.getStudentList(course.id, { page, studentName });
    setTotalPage(Math.ceil(totalStudent / studentContext.limit));
    setFetched(true);
  };

  useEffect(() => {
    fetchStudent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPageChange = (event, newValue) => {
    fetchStudent();
    setPage(newValue);
  }

  const onSearch = () => {
    setPage(1);
    fetchStudent();
  }

  if (!fetched) {
    return <LoadingDNA3X />
  }

  return (
    <Paper
      sx={{
        px: 2,
        py: 2,
        border: 2,
        borderColor: 'primary.main',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '23rem',
      }}
      variant='outlined'
    >
      <Box mb={1} display="flex" flexDirection="row" flexWrap="wrap">
        {/* <Box sx={{ mr: 1 }}>
          <MuiSearch
            label="Course Id"
            placeholder="Search Course Id"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            onSearch={onSearch}
          />
        </Box> */}
        <Box flexGrow={1} sx={{ mr: 1 }}>
          <MuiSearch
            label="Student name"
            placeholder="Search student name"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
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
              <TableCell sx={{ color: 'primary.contrastText' }}>#</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Student Name</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Student Email</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Phone</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Status</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Approve</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fetched
                ? (
                  studentContext.studentList.map((student, index) => (
                    <EditCourseStudentSingleList
                      course={course}
                      student={student}
                      index={index}
                    />
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
              fetched && studentContext.studentList.length === 0 && (
                <TableRow style={{ overflow: 'hidden' }}>
                  <TableCell colSpan={9} style={{  overflow: 'hidden', textAlign: 'center' }}>
                    No Student
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        <Box py={1} display="flex" flexDirection="row" justifyContent="center">
          <Pagination
            count={totalPage}
            page={page}
            onChange={onPageChange}
            color="primary"
            sx={{ justifyContent: 'center' }}
          />
        </Box>
      </TableContainer>
    </Paper>
  )
};

export default EdtiCourseStudent;
