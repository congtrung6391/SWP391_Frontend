import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Link } from '@mui/material';
import UploadFileButton from '../../basic/UploadFileButton';
import { Loading } from '../../common/Loading';

const EditCourseMaterialSingleList = ({ material, updateMaterial, deleteMaterial }) => {
  const [title, setTitle] = useState(material.title);
  const [description, setDescription] = useState(material.description);
  const [file, setFile] = useState(undefined);
  const [filename, setFilename] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  const onUpdateMaterial = async () => {
    setSaving(true);
    const data = {};
    if (title !== material.title) {
      data.title = title;
    } else {
      data.title = material.title;
    }
    if (description !== material.description) {
      data.description = description;
    } else {
      data.description = null;
    }
    if (file) {
      data.fileAttach = file;
    } else {
      data.fileAttach = null;
    }
    await updateMaterial(material.id, data);
    setSaving(false);
  }

  const onDeleteMaterial = async () => {
    setDeleting(true);
    await deleteMaterial(material.id);
    setDeleting(false);
  }

  return (
    <Box
      sx={{
        border: 2,
        borderColor: 'primary.main',
        borderRadius: 3,
        p: 2,
        mb: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.01),
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
        <Box display="flex">
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              mr: 1,
              border: 1,
              bgcolor: '#fff',
            }}
          >
            <Link
              href={material.linkSharing}
              target="_blank"
            >
              View File
            </Link>
          </Button>
          <UploadFileButton
            value={filename}
            onChange={onChangeFile}
          />
        </Box>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            onClick={onUpdateMaterial}
            disabled={saving}
            sx={{ mr: 1 }}
          >
            Save
            {
              saving && (<Loading />)
            }
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDeleteMaterial}
            disabled={deleting}
          >
            Delete
            {
              deleting && (<Loading />)
            }
          </Button>
        </Box>
      </Box>     
    </Box>
  );
};

export default EditCourseMaterialSingleList;
