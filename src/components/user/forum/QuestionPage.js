import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { SubjectContext } from '../../../context/subject.context';
import { ForumContext } from '../../../context/forum.context';
import { AuthenticationContext } from '../../../context/authentication.context';
import { ToastContext } from '../../../context/toast.context';
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import FormatText from '../../basic/FormatText';
import { LoadingDNA3X } from '../../common/Loading';

const QuestionPage = (props) => {
  const { qid } = props;
  const subjectContext = useContext(SubjectContext);
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);
  const { verifyUser } = useContext(AuthenticationContext);

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
    <LoadingDNA3X />
  }

  return (
    <Card style={{ width: '100%' }}>
      <CardHeader
        title={(
          <Box>
            <Typography variant="h5"><strong>{question.title}</strong></Typography>
          </Box>
        )}
        subheader={(
          <Box>
            <Typography variant="body2">
              <em>{`${question.user && question.user.fullname} - ${moment(question.createdDate).format('DD/MM/YYYY')}`}</em>
            </Typography>
          </Box>
        )}
      />
      <CardContent>
        <Box px="0.5rem" fontSize="120%">
          <FormatText
            value={question.description}
          />
        </Box>
        {/* <CommentList topic={article} /> */}
      </CardContent>
    </Card>
  );
};

export default QuestionPage;