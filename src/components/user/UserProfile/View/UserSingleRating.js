import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import {
  Box,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Rating,
  TextField,
  Button,
  Divider,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SubjectContext } from '../../../../context/subject.context';
import { RatingContext } from '../../../../context/rating.context';
import { ToastContext } from '../../../../context/toast.context';
import { getUserInformation } from '../../../../utils/cookies';

const UserSingleRating = ({ user, rate }) => {

  const subjectContext = useContext(SubjectContext);
  const ratingContext = useContext(RatingContext)
  const toastContext = useContext(ToastContext);

  const [rateValue, setRateValue] = useState(rate.value);
  const [description, setDescription] = useState(rate.description);
  const [subjectId, setSubjectId] = useState(rate.subject.id);

  const [editting, setEditting] = useState(false);

  const onUpdateRating = async () => {
    const data = {
      value: rateValue,
      description: description,
    };

    const response = await ratingContext.updateRating(user.id, rate.id, data);
    
    if (typeof response === 'string') {
      toastContext.addNotification('Error', response, 'error');
    } else {
      toastContext.addNotification('Success', 'Update success, please reload page');
    }

    setEditting(false);
  }

  const onDeleteRating = async () => {
    if (window.confirm('This action cannot be undo. Are you sure?')) {
      const response = await ratingContext.deleteRating(user.id, rate.id);
      if (typeof response === 'string') {
        toastContext.addNotification('Error', response, 'error');
      } else {
        toastContext.addNotification('Success', 'Delete success, please reload page');
      }
    }
  }

  const updateDiaglogContent = () => (
    <Box p={2} pt={0}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Rating
          name="rating-article"
          value={rateValue || 0}
          onChange={(event) => setRateValue(parseInt(event.target.value), 10)}
        />
        <FormControl>
          <Select
            id="select-subject"
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value)}
            sx={{
              minWidth: '8.5rem',
              height: '2.2rem',
            }}
            disabled
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
    <Box>
      <Divider 
        sx={{ pt: 2 }}
      />
      <Box
        sx={{ pt: 1 }}
        display="flex"
        flexDirection="row"
      >
        <Box
          sx={{ pr: 1 }}
        >
          <Rating
            name={`rate-${rate.id}`}
            value={rateValue}
            readOnly 
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
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
            {rate.subject.subjectName}
          </Box>
        </Box>
        <Box flexGrow={1} />
        {
          getUserInformation('id') === rate.student.id && (
            <Box>
              <IconButton
                size="small"
                onClick={() => setEditting(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={onDeleteRating}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )
        }
      </Box>
      <Box
        sx={{ pt: 0 }}
      >
        <Typography
          variant="caption"
          fontStyle="italic"
        >
          {`${rate.student.fullName} - ${moment(rate.time).format("DD/MM/yyyy")}`}
        </Typography>
      </Box>
      <Box
        sx={{ pt: 1 }}
      >
        <Typography>{rate.description}</Typography>
      </Box>
      <Dialog
        onClose={() => setEditting(false)}
        open={editting}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit your rating</DialogTitle>
        {updateDiaglogContent()}
        <Box
          sx={{ p: 2, pt: 0 }}
        >
          <Button
            variant="outlined"
            onClick={onUpdateRating}
          >
            save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UserSingleRating;
