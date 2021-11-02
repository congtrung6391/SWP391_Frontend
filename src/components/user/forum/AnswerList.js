import React, { useContext, useEffect, useState } from 'react';
import { ForumContext } from '../../../context/forum.context';
import { ToastContext } from '../../../context/toast.context';
import {
  Box,
  Button,
  Link,
  Pagination,
  Typography,
} from '@mui/material';
import { AuthenticationContext } from '../../../context/authentication.context';
import Editor from '../../basic/Editor/Editor';
import { Loading, LoadingDNA3X } from '../../common/Loading';
import AnswerSingleList from './AnswerSingleList';

const AnswerList = ({ questionId }) => {
  const forumContext = useContext(ForumContext);
  const toastContext = useContext(ToastContext);
  const { verifyUser } = useContext(AuthenticationContext);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const [addContent, setAddContent] = useState('');
  const [adding, setAdding] = useState(false);

  const [fetched, setFetched] = useState(false);

  const fetchAnswerList = async () => {
    setFetched(false);
    await forumContext.getAnswerList(questionId, { page });
    setFetched(true);
  }

  useEffect(() => {
    fetchAnswerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchAnswerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setTotalPage(Math.ceil(forumContext.totalAnswer/forumContext.limit));
  }, [forumContext.totalAnswer, forumContext.limit]);

  const onChangeAddContent = (event) => {
    setAddContent(event.target.value);
  }

  const anAddAnswer = async () => {
    const data = {};
    data.content = addContent;
    setAdding(true);
    const response = await forumContext.addAnswer(questionId, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Add answer failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Add answer success');
      setAddContent('');
    }
    setAdding(false);
  }

  const onChangePage = (event, value) => {
    setPage(value);
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Editor
          mode='markdown'
          lineNumbers={false}
          value={addContent || ''}
          onChange={onChangeAddContent}
        />
        <Box
          mt={1}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={anAddAnswer}
            disabled={adding}
          >
            Add
            {
              adding && (<Loading />)
            }
          </Button>
        </Box>
        <Box
          style={{  
            'backdrop-filter': 'blur(0.1rem)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            zIndex: '1000',
            display: verifyUser() ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{ textAlign: 'center' }}
          >
            <Typography color="inherit" variant="h6">
              You have to 
              &nbsp;
              <Link href="/login" style={{ textDecoration: 'underline' }} color="secondary">Login</Link>
              &nbsp;
              to answer this question.
            </Typography>
          </Box>
        </Box>
      </Box>
      {
        fetched
          ? (
            forumContext.answerList.map((ans) => (
              <AnswerSingleList key={ans.id} answer={ans} qid={questionId} />
            ))
          )
          : (
            <LoadingDNA3X />
          )
      }
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
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

export default AnswerList;
