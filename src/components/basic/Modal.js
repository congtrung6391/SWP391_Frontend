import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';

const Modal = (props) => {
  const {
    title, closebutton, footer, onClose, children,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Dialog
      {...props}
      sx={{
        maxWidth: 'md'
      }}
      fullWidth
    >
      <DialogTitle
        sx={{ pb: 0 }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography variant="h6">
            {title}
          </Typography>
          {
            closebutton === 1
            && (
              <IconButton
                onClick={() => onClose()}
                color='error'
              >
                <span className="fas fa-times" />
              </IconButton>
            )
          }
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      {
        footer
        && (
        <DialogActions>
          {footer}
        </DialogActions>
        )
      }
    </Dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  closebutton: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  footer: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};
Modal.defaultProps = {
  footer: undefined,
  error: 0,
  closebutton: 0,
};

export default Modal;
