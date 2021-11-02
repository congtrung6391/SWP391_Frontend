import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { SubjectContext } from '../../../context/subject.context';
import { ForumContext } from '../../../context/forum.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import { ToastContext } from '../../../context/toast.context';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import FormatText from '../../basic/FormatText';
import { LoadingDNA3X } from '../../common/Loading';
import AnswerList from './AnswerList';
import Editor from '../../basic/Editor/Editor';

const QuestionPage = (props) => {
  const { qid } = props;
  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);

  const [question, setQuestion] = useState({});
  const [fetched, setFetched] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
 
  const fetchQuestion = async () => {
    setFetched(false);
    const newQuestion = await forumContext.getQuestion(qid);
    setQuestion(newQuestion || {});
    setFetched(true);
  }

  useEffect(() => {
    fetchQuestion();
  }, [])

  useEffect(() => {
    fetchQuestion();
  }, [qid])


  const [subjectId, setSubjectId] = useState(null);
  const onChangeSubject = (event) => {
    setSubjectId(event.target.value);
  }

  const [title, setTitle] = useState(question.title);
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }

  const [description, setDesciption] = useState(question.description);
  const onChangeDesciprion = (event) => {
    setDesciption(event.target.value);
  }

  const onOpenModal = () => {
    setShowEditModal(true);
    setFetched(false);
    setTitle(question.title);
    setDesciption(question.description);
    setSubjectId(question.subject.id);
    setFetched(true);
  }

  const onCloseModal = () => {
    setShowEditModal(false)
  }

  const onUpdateQuestion = async () => {
    setSaving(true);
    
    if (title === '') {
      toastContext.addNotification('Error', 'You must enter the Title of question.', 'error');
      setSaving(false);
      return;
    }    
    if (subjectId === 0 || subjectId === null) {
      toastContext.addNotification('Failed', 'You must select a subject.', 'error');
      setSaving(false);
      return;
    }

    const data = {};

    data.subjectId = subjectId;
    data.title = title;
    data.description = description;

    const response = await forumContext.updateQuestion(question.id, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Cannot post question', 'error');
      setSaving(false);
    } else {
      toastContext.addNotification('Success', 'Question is updated.');
      setSaving(false);
      onCloseModal();
    }
  }

  if (!fetched) {
    return <LoadingDNA3X />
  }

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h5"><strong>{question.title}</strong></Typography>
      </Box>
      <Box
        sx={{ pt: 1 }}
        display="flex"
        flexDirection="row"
      >
        <Typography variant="body2">
          <em>{`${question.author && question.author.username} - ${moment(question.createdDate).format('DD/MM/YYYY')}`}</em>
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pl={2}
        >
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
              height: '1.2rem',
            }}
          >
            {question.subject && question.subject.subjectName}
          </Box>
        </Box>
      </Box>
      <Box>
        <FormatText
          value={question.description}
        />
      </Box>
      <Divider sx={{ pt: 1, mb: 2 }} />
      <AnswerList
        questionId={qid}
      />

      <Dialog
        onClose={onCloseModal}
        open={showEditModal && fetched}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: 1,
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
          
          <Button
            variant="contained"
            onClick={onUpdateQuestion}
            sx={{ mt: 2 }}
            disabled={saving}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>

    </Paper>
  );
};

export default QuestionPage;