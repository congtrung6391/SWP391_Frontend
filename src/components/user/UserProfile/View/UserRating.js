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
} from '@mui/material';
import { SubjectContext } from '../../../../context/subject.context';
import { RatingContext } from '../../../../context/rating.context';
import { ToastContext } from '../../../../context/toast.context';
import Rating from '../../../basic/Rating';

const UserRating = ({ user }) => {
  const [rateList, setRateList] = useState(undefined);
  const [totalRate, setTotalRate] = useState(0);
  const [avgRate, setAvgRate] = useState(0);
  const subjectContext = useContext(SubjectContext);
  const ratingContext = useContext(RatingContext)
  const toastContext = useContext(ToastContext);

  const [subjectId, setSuibjectId] = useState(undefined);

  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState('');
  const [subjectIdAdd, setSubjectIdAdd] = useState(null);

  useEffect(() => {
    const { rateList, avgRate, totalRate } = ratingContext.getRatingList(user.id);
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

    if (!avgRate) {
      setAvgRate(0);
    } else {
      setAvgRate(avgRate);
    }

    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSubject = (event) => {
    setSuibjectId(event.target.value);
  }

  const onAddRating = async () => {
    const data = {
      ratingValue: rate,
      ratingDescription: description,
    };
    if (subjectIdAdd) {
      data.subjectId = subjectIdAdd;
    }
    const response = await ratingContext.addRating(user.id, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Error', 'Add rating failed', 'error');
    }
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
            value={subjectIdAdd || 0}
            onChange={(event) => setSubjectIdAdd(event.target.value)}
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
          onAddRating={() => onAddRating()}
          addTitle="Add your feedback?"
          addDiaglogContent={addDiaglogContent}
        />
      </Box>
    </Paper>
  );
}

export default UserRating;
