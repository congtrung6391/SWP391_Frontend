import React, { useContext, useState } from 'react';
import {
  Box, FormControl, MenuItem, Select, TextField, Button,
} from '@mui/material';
import { SubjectContext } from '../../../context/subject.context';
import { ToastContext } from '../../../context/toast.context';
import { ForumContext } from '../../../context/forum.context';
import Editor from '../../basic/Editor/Editor';
import { Loading } from '../../common/Loading';

const QuestionAddPage = (props) => {
  const { closeAddForm } = props;

  const [adding, setAdding] = useState(false);

  const subjectContext = useContext(SubjectContext);
  const toastContext = useContext(ToastContext);
  const forumContext = useContext(ForumContext);

  const [subjectId, setSubjectId] = useState(null);
  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const [title, setTitle] = useState('');
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const [description, setDesciption] = useState('');
  const onChangeDesciprion = (event) => {
    setDesciption(event.target.value);
  }

  const onCloseForm = () => {
    setTitle('');
    setSubjectId(null);
    setDesciption('');
    closeAddForm();
  }

  const onAddForm = async () => {
    setAdding(true);
    
    if (title === '') {
      toastContext.addNotification('Error', 'You must enter the Title of question.', 'error');
      setAdding(false);
      return;
    }    
    if (subjectId === 0 || subjectId === null) {
      toastContext.addNotification('Failed', 'You must select a subject.', 'error');
      setAdding(false);
      return;
    }

    const data = {};

    data.subjectId = subjectId;
    data.title = title;
    data.description = description;

    const response = await forumContext.addQuestion(data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Cannot post question', 'error');
      setAdding(false);
    } else {
      toastContext.addNotification('Success', 'Question is posted');
      setAdding(false);
      onCloseForm();
    }
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: 2,
        borderRadius: 3,
        borderColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          flexGrow={1}
          mr={1}
        >
          <TextField
            fullWidth
            label="Title"
            size="small"
            color="primary"
            value={title || ''}
            onChange={onChangeTitle}
          />
        </Box>
        <FormControl
          sx={{ mr: 1 }}
        >
          {/* <InputLabel id="select-subject">Subject</InputLabel> */}
          <Select
            id="select-subject-add-question"
            // label="Subject"
            value={subjectId || 0}
            onChange={onChangeSubject}
            sx={{
              minWidth: '8.5rem',
              px: 1,
              lineHeight: '1.85rem',
              border: 1,
              borderColor: 'primary.main',
              borderRadius: 1
            }}
            variant="standard"
          >
            {/* <MenuItem key={0} value={0}>All subject</MenuItem> */}
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
      <Box
        sx={{ mt: 2 }}
      >
        <Editor
          mode='markdown'
          lineNumbers={false}
          value={description || ''}
          onChange={onChangeDesciprion}
        />
      </Box>
      <Box
        sx={{ mt: 2 }}
      >
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={onAddForm}
          disabled={adding}
        >
          Post
          {
            adding && <Loading />
          }
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onCloseForm}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionAddPage;
