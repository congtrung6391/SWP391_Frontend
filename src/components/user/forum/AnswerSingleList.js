import React, { useContext, useState } from 'react';
import {
  Box,
  Divider,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { AuthenticationContext } from '../../../context/authentication.context';
import { getUserInformation } from '../../../utils/cookies';
import { ForumContext } from '../../../context/forum.context';
import { ToastContext } from '../../../context/toast.context';
import FormatText from '../../basic/FormatText';
import Editor from '../../basic/Editor/Editor';
import { Loading } from '../../common/Loading';

const AnswerSingleList = ({ qid, answer }) => {
  const { verifyAdministrator } = useContext(AuthenticationContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(answer.content); 

  const showEdit = () => {
    setEditting(true);
  }

  const closeEdit = () => {
    setEditting(false);
  }

  const onDeleteAnswer = async () => {
    setDeleting(true);
    const response = await forumContext.deleteAnswer(qid, answer.id);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Delete answer failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Delete answer success');
      setContent('');
      setEditting(false);
    }
    setDeleting(false);
  }

  const onChangeContent = (event) => {
    setContent(event.target.value);
  }

  const onUpdateAnswer = async () => {
    const data = {};
    data.content = content;
    setSaving(true);
    const response = await forumContext.updateAnswer(qid, answer.id, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Update answer failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Update answer success');
      setContent('');
      setEditting(false);
    }
    setSaving(false);
  }

  return (
    <Box>
      <Divider
        sx={{ mt: 2, mb: 2 }}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="body2">
          <em>{`${answer.user && (answer.user.username || 'Anonymous')} - ${moment(answer.createdDate).format('DD/MM/YYYY')}`}</em>
        </Typography>
        {
          (getUserInformation('id') === answer.user.id || verifyAdministrator()) && (
            <ButtonGroup
              variant="text"
              size="small"
            >
              <Button
                color="secondary"
                onClick={showEdit}
              >
                <EditIcon fontSize="small" />
              </Button>
              <Button
                color="error"
                disabled={deleting}
                onClick={() => onDeleteAnswer(answer.id)}
              >
                <DeleteIcon fontSize="small" />
                {
                  deleting && (<Loading />)
                }
              </Button>
            </ButtonGroup>
          )
        }
      </Box>
      {
        editing
          ? (
            <Box>
              <Editor
                mode='markdown'
                lineNumbers={false}
                value={content || ''}
                onChange={onChangeContent}
              />
              <ButtonGroup
                variant="outlined"
                mt={2}
              >
                <Button
                  color="secondary"
                  onClick={onUpdateAnswer}
                  disabled={saving}
                >
                  Save
                  {
                    saving && (<Loading />)
                  }
                </Button>
                <Button
                  color="warning"
                  onClick={closeEdit}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          )
          : (
            <Box
              sx={{
                mt: '-0.5rem',
              }}
            >
              <FormatText
                value={answer.content}
              />
            </Box>
          )
      }
    </Box>
  );
};

export default AnswerSingleList;