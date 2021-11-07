import React, { useContext, useEffect, useState } from 'react';
import { AdminCourseMaterialContext } from '../../../context/adminCourseMaterial.context';
import {
  Box, Typography,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import {
  useTheme,
  alpha,
} from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingDNA3X } from '../../common/Loading';

const PublicCourseMaterialList = ({ course }) => {
  const materialContext = useContext(AdminCourseMaterialContext);
  const [materialList, setMaterialList] = useState([]);
  const [fetched, setFetched] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchMatrialList = async () => {
      setFetched(false);
      const response = await materialContext.getMaterialList(course.id)
      const { materialList: material } = response;
      setMaterialList(material);
      setFetched(true);
    }
    fetchMatrialList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (fetched && materialList === undefined) {
    return (
      <Box
        sx={{
          p: 2,
          border: 3,
          borderTop: 0,
          borderColor: 'primary.main',
        }}
      >
        <Typography variant="subtitle">
          You do not have permission to access this course's material.
        </Typography>
      </Box>
    );
  }

  if (fetched && materialList.length === 0) {
    return (
      <Box
        sx={{
          p: 2,
          border: 3,
          borderTop: 0,
          borderColor: 'primary.main',
        }}
      >
        <Typography variant="subtitle">
          There is no material for this course.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 2,
        border: 3,
        borderTop: 0,
        borderColor: 'primary.main',
      }}
    >
      {
        fetched
          ? (
            materialList.map((material) => [(
              <Box
              sx={{
                mx: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
              }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  pb={1}
                >
                  <Typography
                    variant="h6"
                  >
                    {material.title}
                  </Typography>
                  <IconButton
                    color="primary"
                    disabled={!material.linkSharing}
                  >
                    <Link
                      href={material.linkSharing && material.linkSharing.replace('https://www.dropbox.com/', 'https://dl.dropboxusercontent.com/')}
                      target="_blank"
                    >
                      <FileDownloadIcon />
                    </Link>
                  </IconButton>
                </Box>
                <Divider />
                <Typography>
                  {material.description}
                </Typography>
              </Box>
            ), (
              <Divider sx={{ my: 2 }} />
            )])
          )
          : (
            <LoadingDNA3X />
          )
      }
    </Box>
  )
};

export default PublicCourseMaterialList;