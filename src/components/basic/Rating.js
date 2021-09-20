import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Dialog, DialogTitle, Typography, withStyles,
} from '@material-ui/core';
import { Rating as MulRating } from '@material-ui/lab';

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

const Rating = (props) => {
  const [addingRating, setAddingRating] = useState(false);

  const {
    rating, ratingCount, size, onAddRating,
  } = props;

  const toggleDialog = () => {
    if (addingRating) {
      setAddingRating(false);
    } else {
      setAddingRating(true);
    }
  };

  return (
    <Box>
      <Box display="flex">
        <Box alignItems="center">
          <MulRating
            name="rating-article"
            size={size}
            value={rating || 0}
            readOnly
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="caption">{`(${ratingCount})`}</Typography>
        </Box>
      </Box>
      {
        onAddRating && (
          <AddRatingButton disableRipple onClick={toggleDialog}>Thêm đánh giá</AddRatingButton>
        )
      }
      <Dialog
        onClose={toggleDialog}
        open={addingRating}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>How do you feel?</DialogTitle>
        <Box display="flex" justifyContent="center" pb="1rem">
          <MulRating
            name="rating-article"
            value={rating || 0}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  size: PropTypes.string,
  onAddRating: PropTypes.func,
};

Rating.defaultProps = {
  rating: 0,
  ratingCount: 0,
  size: 'small',
  onAddRating: null,
};

export default Rating;
