import { Box } from '@mui/material';
import React from 'react';

const UploadFileButton = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    sx,
  } = props;

  return (
    <Box
      className='custom-upload'
      sx={sx}
    >
      <input
        type="file"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
};

export default UploadFileButton;


