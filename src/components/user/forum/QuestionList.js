import React, { useContext, useEffect, useState } from 'react';
import MuiSearch from '../../common/MuiSearch';
import { SubjectContext } from '../../../context/subject.context';
import { ForumContext } from '../../../context/forum.context';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import QuestionSingleList from './QuestionSingleList';
import QuestionAddPage from './QuestionAddPage';

const QuestionList = (props) => {
  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(ForumContext);

  const [subjectId, setSubjectId] = useState(null);
  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const [searchName, setSearchName] = useState(null);
  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }
  useEffect(() => {

  }, [subjectId]);

  const [showAddForm, setShowAddForm] = useState(false);
  const toggleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  }

  const onCloseAddForm = () => {
    setShowAddForm(false);
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
        forumContext.questionList.map((question) => {
          <QuestionSingleList
            key={question.id}
            question={question}
          />
        })
      }
    </Box>
  );
};

export default QuestionList;