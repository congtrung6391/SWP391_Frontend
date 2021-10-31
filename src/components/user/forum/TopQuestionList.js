import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import {
  Box, 
  Typography,
  Divider,
} from '@mui/material';
import { ForumContext } from '../../../context/forum.context';

const TopQuestionList = (props) => {
  const forumContext = useContext(ForumContext);
  const [questionList, setQuestionList] = useState([])

  const fetchQuestionList = async () => {
    const list = await forumContext.getTopQuestionList();
    setQuestionList(list);
  }

  useEffect(() => {
    fetchQuestionList();
  }, [])


  return (
    <Box
      sx={{
        border: 3,
        borderColor: 'primary.main',
        borderRadius: 2,
        px: 2,
        pt: 1,
      }}
    >
      <Typography
        variant="h6"
      >
        Top Question
      </Typography>
      {
        questionList.map((question) => (
          <NavLink
            to={`/forum/question/${question.id}`}
            key={question.id}
          >
            <Box
              sx={{ mb: 2, mt: 1 }}
            >
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body1" fontWeight="bold">{question.title}</Typography>
              <Box
                display='flex'
                flexDirection='row'
              >
                <Box sx={{ mr: 1 }}>
                  <Typography variant="caption">{question.author.fullName}</Typography>
                </Box>
                <Typography variant="caption">-&nbsp;</Typography>
                <Typography
                  variant="caption"
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
              <Box
                display='flex'
                flexDirection='row'
              >
                <Typography variant="body2">{`Number of answers: ${question.numberOfAnswer}`}</Typography>
              </Box>
            </Box>
          </NavLink>
        ))
      }
    </Box>
  );
};

export default TopQuestionList;