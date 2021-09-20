import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  // ListItemText,
  // ListItemIcon,
  // ListItem,
  ButtonGroup,
  Card,
  CardMedia,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import CertificateServices from '../../../services/certificate.service';
import { LoadingDNA } from '../../common/Loading';
import ShareButton from '../../common/ButtonShare';

const UserPassword = () => {
  const [fetched, setFetched] = useState(false);
  const [certList, setCertList] = useState([]);

  useEffect(() => {
    const fetchCertList = async () => {
      setFetched(false);
      const certificateList = await CertificateServices.getPublicCertificateList();
      setCertList(certificateList);
      setFetched(true);
    };
    fetchCertList();
  }, []);

  const downloadCertificate = async (cert) => {
    window.open(cert.PDFUrl);
  };

  return (
    <Paper
      component={Box}
      mb={2}
      p={3}
      boxShadow={2}
    >
      <Typography component={Box}>
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Chứng chỉ
        </Box>
        <Box
          my={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="flex-start"
        >
          {
            fetched
              ? certList.map((c) => (
                <Card
                  component={Box}
                  m={2}
                  className="hover-shadow"
                  key={c.Id}
                >
                  <Box
                    className="shadow-hover"
                    display="flex"
                    flexDirection="column"
                  >
                    <Link to={`/users/${c.UserId}/certificates/${c.Id}`}>
                      <CardMedia
                        image={c.ImageUrl}
                        title="certificate"
                        style={{ height: '15rem', width: '21.15rem' }}
                      />
                      <Box py={1} textAlign="center">
                        <Typography variant="h6"><strong>{c.CourseName}</strong></Typography>
                        <Typography>{c.Description}</Typography>
                      </Box>
                    </Link>
                    <ButtonGroup
                      className="button-group"
                      fullWidth
                      color="secondary"
                      variant="outlined"
                    >
                      <ShareButton
                        component={Button}
                        buttonProps={{
                          color: 'secondary',
                          variant: 'outlined',
                          fullWidth: true,
                          style: { minWidth: '40px' },
                        }}
                        url={`${window.location.origin}/users/${c.UserId}/certificates/${c.Id}`}
                        icon={<ShareIcon />}
                        text=""
                      />
                      <Button onClick={() => downloadCertificate(c)}>
                        <SystemUpdateAltIcon />
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Card>
                // <ListItem divider className="hover-shadow" key={c.Id}>
                //   <ListItemText>
                //     <Link
                //       to={`/accomplishments/certificates/${c.Id}`}
                //       target="_blank"
                //     >
                //       <strong>{c.CourseName}</strong>
                //       &nbsp;
                //       &nbsp;
                //       {c.Description}
                //     </Link>
                //   </ListItemText>
                //   <ListItemIcon>
                //     <ButtonGroup color="secondary">
                //       <ShareButton
                //         component={Button}
                //         buttonProps={{
                //           color: 'secondary',
                //           variant: 'outlined',
                //           style: { minWidth: '40px' },
                //         }}
                //         url={`${window.location.origin}/accomplishments/certificates/${c.Id}`}
                //         icon={<ShareIcon />}
                //         text=""
                //       />
                //       <Button disabled={downloading[c.Id]}
                // onClick={() => downloadCertificate(c)}>
                //         {
                //           downloading[c.Id]
                //             ? <Loading />
                //             : <SystemUpdateAltIcon />
                //         }
                //       </Button>
                //     </ButtonGroup>
                //   </ListItemIcon>
                // </ListItem>
              ))
              : <LoadingDNA />
          }
        </Box>
      </Typography>
    </Paper>
  );
};

export default UserPassword;
