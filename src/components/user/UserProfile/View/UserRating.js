import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Rating as MuiRating,
  TextField,
  Button,
  Pagination,
} from '@mui/material';
import { SubjectContext } from '../../../../context/subject.context';
import { RatingContext } from '../../../../context/rating.context';
import { ToastContext } from '../../../../context/toast.context';
import { AuthenticationContext } from '../../../../context/authentication.context';
import Rating from '../../../basic/Rating';
import UserSingleRating from './UserSingleRating';

const UserRating = ({ user }) => {
  const [rateList, setRateList] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [avgRate, setAvgRate] = useState(0);

  const subjectContext = useContext(SubjectContext);
  const ratingContext = useContext(RatingContext)
  const toastContext = useContext(ToastContext);
  const { verifyUser } = useContext(AuthenticationContext);  

  const [subjectId, setSuibjectId] = useState(undefined);

  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState('');
  const [subjectIdAdd, setSubjectIdAdd] = useState(1);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfPage, setNumberOfPage] = useState(1);

  const fetchRateList = async () => {
    const {
      rateList, avgRate, totalRate
    } = await ratingContext.getRatingList(
      user.id, 
      {
        subjectId: subjectId === 0 ? null : subjectId,
        page,
        limit,
      }
    );

    if (!rateList) {
      setRateList([]);
    } else {
      setRateList(rateList);
    }

    if (!totalRate) {
      setTotalRate(0);
    } else {
      setTotalRate(totalRate);
    }

    if (!avgRate || avgRate === 'NaN') {
      setAvgRate(0);
    } else {
      setAvgRate(avgRate);
    }

    setNumberOfPage(Math.ceil(totalRate/limit));
  }

  useEffect(() => {
    fetchRateList();
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchRateList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, page, limit])

  const onChangeSubject = (event) => {
    setSuibjectId(event.target.value);
  }

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  }

  const onAddRating = async () => {
    const data = {
      value: rate,
      description: description,
    };
    if (subjectIdAdd) {
      data.subjectId = subjectIdAdd;
    }
    const response = await ratingContext.addRating(user.id, data);
    
    if (typeof response === 'string') {
      toastContext.addNotification('Error', response, 'error');
    } else {
      response.subject = { id: subjectIdAdd };
      rateList.splice(0, 0, response);
      setRateList(rateList);
    }

    setRate('');
    setDescription('');
    setSubjectIdAdd(1);
  }

  const addDiaglogContent = () => (
    <Box p={2} pt={0}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <MuiRating
          name="rating-article"
          value={rate || 0}
          onChange={(event) => setRate(parseInt(event.target.value), 10)}
        />
        <FormControl>
          <Select
            id="select-subject"
            value={subjectIdAdd || 1}
            onChange={(event) => setSubjectIdAdd(event.target.value)}
            sx={{
              minWidth: '8.5rem',
              height: '2.2rem',
            }}
          >
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
      <TextField
        label="Description"
        fullWidth
        multiline
        maxRows={5}
        sx={{ mt: 1 }}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </Box>
  );

  return (
    <Paper
      component={Box}
      mb={2}
      p={3}
      boxShadow={2}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Feedback
        </Box>
        <FormControl>
          <Select
            id="select-subject"
            value={subjectId || 0}
            onChange={(event) => onChangeSubject(event)}
            sx={{
              minWidth: '8.5rem',
              height: '2.2rem',
            }}
          >
            <MenuItem
              key={0}
              value={0}
            >
              Overall
            </MenuItem>
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
      <Box>
        <Rating
          rating={avgRate}
          size="size-medium"
          ratingCount={totalRate}
          onAddRating={verifyUser() ? () => onAddRating() : null}
          addTitle="Add your feedback?"
          addDiaglogContent={addDiaglogContent}
        />
      </Box>
      <Box>
        {
          rateList.map((rate) => (
            <UserSingleRating
              key={rate.id}
              user={user}
              rate={rate}
            />
          ))
        }
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          color="primary"
          count={numberOfPage}
          page={page || 1}
          onChange={onChangePage}
        />
      </Box>
    </Paper>
  );
}

export default UserRating;
