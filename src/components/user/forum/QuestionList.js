import React, { useContext, useEffect, useState } from 'react';
import MuiSearch from '../../common/MuiSearch';
import { SubjectContext } from '../../../context/subject.context';
import { ForumContext } from '../../../context/forum.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
  Pagination,
} from '@mui/material';
import QuestionSingleList from './QuestionSingleList';
import QuestionAddPage from './QuestionAddPage';
import { ToastContext } from '../../../context/toast.context';
import { LoadingDNA3X } from '../../common/Loading';

const QuestionList = (props) => {
  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);
  const { verifyUser } = useContext(AuthenticationContext);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [subjectId, setSubjectId] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchQuestionList = async () => {
    setFetched(false);
    await forumContext.getQuestionList({ page, subjectId, name: searchName });
    setFetched(true);
  }

  useEffect(() => {
    fetchQuestionList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(forumContext.totalQuestion/forumContext.limit));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumContext.totalQuestion])

  useEffect(() => {
    fetchQuestionList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, page]);


  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const [searchName, setSearchName] = useState(null);
  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
    setPage(1);
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const toggleShowAddForm = () => {
    if (!showAddForm) {
      if (!verifyUser()) {
        toastContext.addNotification('Error', 'You have to login first.', 'error');
        return;
      }
    }
    setShowAddForm(!showAddForm);
  }

  const onCloseAddForm = () => {
    setShowAddForm(false);
  }

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
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
        <Box
          flexGrow={1}
          mr={1}
        >
          <MuiSearch
            value={searchName || ''}
            onChange={onChangeSearchName}
            onSearch={fetchQuestionList}
          />
        </Box>
        <Button
          variant="contained"
          onClick={toggleShowAddForm}
        >
          New question
        </Button>
      </Box>
      {
        showAddForm && (
          <QuestionAddPage closeAddForm={onCloseAddForm} />
        )
      }
      {
        !fetched
          ? (
            <LoadingDNA3X />
          )
          : (
            forumContext.questionList.map((question, index) => (
              <QuestionSingleList
                question={question}
                divider={index !== 0}
                key={question.id}
              />
            ))
          )
      }
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Pagination
          color="primary"
          count={totalPage}
          page={page}
          onChange={onChangePage}
        />
      </Box>
    </Box>
  );
};

export default QuestionList;