import React, { useContext, useEffect, useState } from 'react';
import {
  // Typography,
  Box,
  // Grid,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Pagination,
  FormControl,
  // InputLabel,
  Select,
  MenuItem,
  IconButton,
  // TextField,
  Button,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Loading, LoadingDNA3X } from '../../common/Loading';
// import PaginationList from '../../basic/PaginationList';
// import SingleUser from './SingleUser';
// import UserTypeProvider, { UserTypeContext } from '../../../context/usertype.context';
import { AdminUserContext } from '../../../context/adminUser.context';
import { ToastContext } from '../../../context/toast.context';
import MuiSearch from '../../common/MuiSearch';
import { AdminForumContext } from '../../../context/adminForum.context';
import { SubjectContext } from '../../../context/subject.context';

const ListQuestion = () => {

  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(AdminForumContext);
  const toastContext = useContext(ToastContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [subjectId, setSubjectId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchQuestionList = async () => {
    setFetched(false);
    await forumContext.getQuestionList({ page, subjectId, name: searchName });
    setFetched(true);
  }

  useEffect(() => {
    fetchQuestionList();
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(forumContext.totalQuestion/forumContext.limit));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumContext.totalQuestion])

  useEffect(() => {
    fetchQuestionList();
  }, [subjectId, page]);


  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const [searchName, setSearchName] = useState(null);
  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
    setPage(1);
  }

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  }

  const onSearch = async () => {
    setPage(1);
    await fetchQuestionList();
  }

  const onDeleteQuestion = async (qid) => {
    if (window.confirm('This action cannot be undo. Are you sure?')) {
      setDeleting(qid);
      const response = await forumContext.deletQuestion(qid);
      if (response) {
        toastContext.addNotification('Error', 'Delete question failed', 'error');
      } else {
        toastContext.addNotification('Success', 'Delete question success');
      }
      setDeleting(qid);
    }
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
          sx={{ mr: 1 }}
        >
          {`Total users: ${forumContext.totalQuestion}`}
        </Button>
        <Box flexGrow={1}
          sx={{ mr: 1 }}
        >
          <MuiSearch
            placeholder='Search question title'
            value={searchName}
            onChange={onChangeSearchName}
            onSearch={onSearch}
          />
        </Box>
        <FormControl
          sx={{ mr: 1 }}
        >
          {/* <InputLabel id="select-subject">Subject</InputLabel> */}
          <Select
            id="select-subject"
            // label="Subject"
            value={subjectId || 0}
            onChange={onChangeSubject}
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
        <Button
          variant="contained"
          color="secondary"
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
              <TableCell sx={{ color: 'primary.contrastText' }}>Author</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Email</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Subject</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fetched
                ? (
                  forumContext.questionList.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.title.substring(0, Math.min(20, question.title.length))}</TableCell>
                      <TableCell>{question.author.username}</TableCell>
                      <TableCell>{question.author.email}</TableCell>
                      <TableCell>{question.subject.subjectName}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => onDeleteQuestion(question.id)}
                          disabled={deleting}
                        >
                          <DeleteForeverIcon color="error" />
                          {
                            deleting === question.id && (
                              <Loading />
                            )
                          }
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )
                : (
                  <TableRow style={{ overflow: 'hidden' }}>
                    <TableCell colSpan={6} style={{  overflow: 'hidden' }}>
                      <LoadingDNA3X />
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
            onChange={onChangePage}
            color="primary"
            sx={{ justifyContent: 'center' }}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default ListQuestion;
