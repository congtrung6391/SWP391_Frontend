import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Rating as MuiRating,
} from '@mui/material';
import {
  withStyles
} from '@mui/styles';
import { Loading } from '../common/Loading';

const AddRatingButton = withStyles(() => ({
  root: {
    textTransform: 'unset',
    fontWeight: 'normal',
    padding: '0.2rem',
    '&:hover': {
      backgroundColor: '#fff',
      fontWeight: 'bold',
    },
    '&:click': {

    },
  },
}))(Button);

const addDiaglogContent = (rating) => (
  <Box display="flex" justifyContent="center" pb="1rem">
    <MuiRating
      name="rating-article"
      value={rating || 0}
    />
  </Box>
);

const Rating = (props) => {
  const [addingRating, setAddingRating] = useState(false);
  const [adding, setAdding] = useState(false);

  const {
    rating,
    ratingCount,
    size,
    onAddRating,
    addTitle,
    addDiaglogContent,
  } = props;

  const toggleDialog = () => {
    if (addingRating) {
      setAddingRating(false);
    } else {
      setAddingRating(true);
    }
  };

  const addRating = async () => {
    setAdding(true);
    await onAddRating();
    setAdding(false);
    setAddingRating(false);
  }

  return (
    <Box>
      <Box display="flex">
        <Box alignItems="center">
          <MuiRating
            name="rating-article"
            size={size}
            value={rating || 0}
            readOnly
          />
        </Box>
        &nbsp;
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant={size==='small' ? 'caption' : 'body1'}>{`(${ratingCount})`}</Typography>
        </Box>
      </Box>
      {
        onAddRating && (
          <AddRatingButton
            disableRipple
            onClick={toggleDialog}
            variant="outlined"
          >
            Add your rating
          </AddRatingButton>
        )
      }
      <Dialog
        onClose={toggleDialog}
        open={addingRating}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{addTitle}</DialogTitle>
        {addDiaglogContent(rating)}
        <Box
          sx={{ p: 2, pt: 0 }}
        >
          <Button
            variant="outlined"
            disabled={adding}
            onClick={addRating}
          >
            save
            {
              adding && ( <Loading /> )
            }
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  size: PropTypes.string,
  addTitle: PropTypes.string,
  addDiaglogContent: PropTypes.func,
  onAddRating: PropTypes.func,
};

Rating.defaultProps = {
  rating: 0,
  ratingCount: 0,
  size: 'small',
  addTitle: 'How do you feel?',
  addDiaglogContent: addDiaglogContent,
};

export default Rating;
