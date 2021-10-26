import {
  Typography,
  Box,
  Divider,
  ButtonGroup,
  Button,
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

const QuestionSingleList = (props) => {
  const { question } = props;
  const { verifyAdministrator } = useContext(AuthenticationContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);

  const [editting, setEditting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);


  if (question.userInformationResponse) {
    question.user = question.userInformationResponse;
  }

  const onDeleteQuestion = async (qid) => {
    setDeleting(true);
    const response = await forumContext.deletQuestion(qid);
    if (response) {
      toastContext.addNotification('Error', 'Delete question failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Delete question success');
    }
    setDeleting(false);
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
        <Typography variant="h6">{question.title}</Typography>
        {
          (getUserInformation('id') === question.user.id || verifyAdministrator()) && (
            <ButtonGroup
              variant="text"
              size="small"
            >
              <Button
                color="secondary"
              >
                <EditIcon />
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
          <Typography variant="subtitle2">{question.user.fullName}</Typography>
        </Box>
        <Typography
          variant="subtitle2"
          fontStyle='italic'
        >
          {moment(question.createdDate, 'yyyy-MM-DD').format('DD-MM-yyyy')}
        </Typography>
      </Box>
      <Box>
        <FormatText
          value={question.desciption}
        />
      </Box>
    </Box>
  );
};

export default QuestionSingleList;