import React, { useContext, useEffect, useState } from 'react';
import { AdminCourseMaterialContext } from '../../../context/adminCourseMaterial.context';
import {
  Box, Typography,
  Divider,
  IconButton,
  Link,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import {
  useTheme,
  alpha,
} from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Table } from 'react-bootstrap';

const PublicCourseInfor = ({ course }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: 3,
        borderTop: 0,
        borderColor: 'primary.main',
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          p: 2
        }}
      >
        <Table>
          <TableRow>
            <TableCell>
              <Typography variant="h6" colSpan={2}>
                Basic information
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Course Name:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {course.courseName}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Course Description:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" >
                {course.courseDescription}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Length of each lesson:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {`${Math.floor(parseInt(course.length, 10)/60)} hour(s) ${parseInt(course.length, 10)%60} minute(s)`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Cost of each lesson:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {`${course.cost} VND`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Grade:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {course.grade === 1 && `${course.grade}st Grade`}
                {course.grade === 2 && `${course.grade}nd Grade`}
                {course.grade === 3 && `${course.grade}rd Grade`}
                {course.grade > 3 && `${course.grade}th Grade`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Subject:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {course.subject.subjectName}
              </Typography>
            </TableCell>
          </TableRow>
          <Divider />
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6">
                Contact Tutor
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Email:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {course.tutor.email}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                Phone:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {course.tutor.phone}
              </Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default PublicCourseInfor;