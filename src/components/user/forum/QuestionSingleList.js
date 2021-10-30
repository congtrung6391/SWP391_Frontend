import {
  Typography,
  Box,
  Divider,
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from 'react';
import moment from 'moment';
import FormatText from '../../basic/FormatText';
import { AuthenticationContext } from '../../../context/authentication.context';
import { getUserInformation } from '../../../utils/cookies';
import { ForumContext } from '../../../context/forum.context';
import { ToastContext } from '../../../context/toast.context';
import { NavLink } from 'react-router-dom';
import Editor from '../../basic/Editor/Editor';
import { SubjectContext } from '../../../context/subject.context';
import { Loading } from '../../common/Loading';

const QuestionSingleList = (props) => {
  const { question } = props;
  const { verifyAdministrator } = useContext(AuthenticationContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);
  const subjectContext = useContext(SubjectContext);

  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fetched, setFetched] = useState(true);

  if (question.userInformationResponse) {
    question.user = question.userInformationResponse;
  }

  const [subjectId, setSubjectId] = useState(question.subject.subjectId);
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

  const onOpenModal = async () => {
    setShowEditModal(true);
    setFetched(false);
    const response = await forumContext.getQuestion(question.id);
    setTitle(response.title);
    setDesciption(response.description);
    setSubjectId(response.subject.id);
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

  const onDeleteQuestion = async (qid) => {
    if (window.confirm('This action cannot be undo. Are you sure?')) {
      setDeleting(true);
      const response = await forumContext.deletQuestion(qid);
      if (response) {
        toastContext.addNotification('Error', 'Delete question failed', 'error');
      } else {
        toastContext.addNotification('Success', 'Delete question success');
      }
      setDeleting(false);
    }
  }

  return (
    <Box
      sx={{
        p: 1
      }}
    >
      <Divider sx={{ my: 1 }} />
      <Box
        display='flex'
        flexDirection='row'
        justifyContent="space-between"
      >
        <NavLink to={`forum/question/${question.id}`}>
          <Typography variant="h6">{question.title}</Typography>
        </NavLink>
        {
          (getUserInformation('id') === question.author.id || verifyAdministrator()) && (
            <ButtonGroup
              variant="text"
              size="small"
            >
              <Button
                color="secondary"
                onClick={onOpenModal}
                disabled={showEditModal}
              >
                {
                  showEditModal
                    ? <Loading />
                    : <EditIcon />
                }
              </Button>
              <Button
                color="error"
                disabled={deleting}
                onClick={() => onDeleteQuestion(question.id)}
              >
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          )
        }
      </Box>
      <Box
        display='flex'
        flexDirection='row'
      >
        <Box sx={{ mr: 1 }}>
          <Typography variant="subtitle2">{question.author.fullName}</Typography>
        </Box>
        <Typography variant="subtitle2">-&nbsp;</Typography>
        <Typography
          variant="subtitle2"
          fontStyle='italic'
        >
          {moment(question.createdDate, 'yyyy-MM-DD').format('DD/MM/yyyy')}
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
        <NavLink to={`forum/question/${question.id}`}>
          <FormatText
            value={question.description.substring(0, Math.min(150, question.description.length))}
          />
        </NavLink>
      </Box>
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
    </Box>
  );
};

export default QuestionSingleList;