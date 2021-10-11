import React, { useState } from 'react';
import {
  Box, TextField, Button, IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { alpha, useTheme } from '@mui/material/styles';
import UploadFileButton from '../../basic/UploadFileButton';
import { Loading } from '../../common/Loading';

const AddCourseMaterial = ({ onAddMaterial }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(undefined);
  const [filename, setFilename] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const theme = useTheme();

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  }

  const onChangeFile = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.value);
  }

  const onCreateMaterial = async () => {
    setSaving(true);
    const data = {
      title,
      description,
    };
    if (file) {
      data.fileAttach = file;
    }
    await onAddMaterial(data);
    setTitle('');
    setDescription('');
    setFile(undefined);
    setFilename('');
    setSaving(false);
  }

  const toggleEditing = () => {
    if (editing) setEditing(false);
    else setEditing(true);
  }

  if (!editing) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent='center'
        sx={{
          border: 3,
          borderColor: 'success.main',
          borderRadius: 3,
          p: 0,
          bgcolor: alpha(theme.palette.success.main, 0.1),
        }}
        onClick={toggleEditing}
      >
        <IconButton
          color="success"
        >
          <AddCircleOutlineIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: 3,
        borderColor: 'success.main',
        borderRadius: 3,
        p: 2,
        bgcolor: alpha(theme.palette.success.main, 0.1),
      }}
    >
      <Box
        mb={2}
        sx={{ bgcolor: '#fff' }}
      > 
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          name="title"
          value={title}
          onChange={onChangeTitle}
        />
      </Box>
      <Box
        mb={2}
        sx={{ bgcolor: '#fff' }}
      >
        <TextField
          fullWidth
          variant="outlined"
          multiline
          maxRows={10}
          label="Description"
          name="description"
          value={description}
          onChange={onChangeDescription}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <UploadFileButton
          value={filename}
          onChange={onChangeFile}
        />
        <Box>
          <Button
            color="secondary"
            variant="contained"
            onClick={onCreateMaterial}
            disabled={saving}
            sx={{ mr: 1 }}
          >
            Create
            {
              saving && (<Loading />)
            }
          </Button>
          <Button
            color="warning"
            variant="contained"
            onClick={toggleEditing}
          >
            Cancel
          </Button>
        </Box>
      </Box>     
    </Box>
  );
};

export default AddCourseMaterial;
