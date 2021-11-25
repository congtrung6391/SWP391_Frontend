import { IconButton, TableCell, TableRow } from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AdminCourseStudentContext } from '../../../context/AdminCourseStudent.context';
import { ToastContext } from '../../../context/toast.context';
import { Loading } from '../../common/Loading';

const EditCourseStudentSingleList = ({ course, student, index }) => {
  const studentContext = useContext(AdminCourseStudentContext);
  const toastContext = useContext(ToastContext);

  const [deleting, setDeleting] = useState(false);
  const [approving, setApproving] = useState(false);

  const onReplyRegister = async (cid, sid, action) => {
    const response = await studentContext.replyRegister(cid, sid, action);
    if (response === null) {
      toastContext.addNotification('Action success');
    } else {
      toastContext.addNotification('Action failed', 'Cannot perform action', 'error');
    }
  }

  return (
    <TableRow key={student.courseStudentId}>
      <TableCell>
        <NavLink to={`/users/${student.student.id}/profile`}>
          {index}
        </NavLink>
      </TableCell>
      <TableCell>
        <NavLink to={`/users/${student.student.id}/profile`}>
          {student.student.fullName}
        </NavLink>
      </TableCell>
      <TableCell>
        <NavLink to={`/users/${student.student.id}/profile`}>
          {student.student.email}
        </NavLink>
      </TableCell>
      <TableCell>
        <NavLink to={`/users/${student.student.id}/profile`}>
          {student.student.phone}
        </NavLink>
      </TableCell>
      <TableCell align="center">
        <MenuBookIcon
          color={!student.learningStatus ? 'error' : 'success'}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="success"
          onClick={async () => {
            setApproving(true);
            await onReplyRegister(course.id, student.courseStudentId, true);
            setApproving(false);
          }}
          disabled={approving}
        >
          {
            approving && <Loading />
          }
          {
            (!student.learningStatus && !approving)
              ? <CheckCircleOutlineIcon />
              : null
          }
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="error"
          onClick={async () => {
            setDeleting(true);
            await onReplyRegister(course.id, student.courseStudentId, false);
            setDeleting(false);
          }}
          disabled={deleting}
        >
          {
            deleting
              ? <Loading />
              : <HighlightOffIcon />
          }
        </IconButton>
      </TableCell>
    </TableRow> 
  );
}

export default EditCourseStudentSingleList;
