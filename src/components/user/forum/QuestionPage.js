import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { SubjectContext } from '../../../context/subject.context';
import { ForumContext } from '../../../context/forum.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import { ToastContext } from '../../../context/toast.context';
import { Box, Paper, CardHeader, CardContent, Typography, Divider } from '@mui/material';
import FormatText from '../../basic/FormatText';
import { LoadingDNA3X } from '../../common/Loading';
import AnswerList from './AnswerList';

const QuestionPage = (props) => {
  const { qid } = props;
  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);

  const [question, setQuestion] = useState({});
  const [fetched, setFetched] = useState(false);

  const fetchQuestion = async () => {
    setFetched(false);
    const newQuestion = await forumContext.getQuestion(qid);
    setQuestion(newQuestion || {});
    setFetched(true);
  }

  useEffect(() => {
    fetchQuestion();
  }, [])

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
          <em>{`${question.user && question.author.fullname} - ${moment(question.createdDate).format('DD/MM/YYYY')}`}</em>
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
    </Paper>
  );
};

export default QuestionPage;