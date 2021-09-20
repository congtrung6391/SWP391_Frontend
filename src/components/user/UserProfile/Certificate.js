import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, ButtonGroup, Link,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ShareButton from '../../common/ButtonShare';
import Body from '../../basic/Body';
import CertificateServices from '../../../services/certificate.service';
import { LoadingPage } from '../../common/Loading';
import NavigationBar from '../../common/NavigationBar';

const Certificate = (props) => {
  const [fetched, setFetched] = useState(false);
  const [cert, setCert] = useState({});

  useEffect(() => {
    const fetchCert = async () => {
      setFetched(false);

      const certId = parseInt(props.match.params.certId, 10);
      const newCert = await CertificateServices.getPublicCertificate(certId);

      setCert(newCert);
      setFetched(true);
    };
    fetchCert();
  }, []);

  const getFile = async () => {
    window.open(cert.PDFUrl);
  };

  return (
    <div>
      {
        fetched
          ? (
            <div>
              <NavigationBar nav={[]} />
              <Body>
                <Paper
                  className="w-100"
                  component={Box}
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  p={3}
                  mb={2}
                >
                  <Box flexBasis="70%" flexGrow={1} className="certificate-preview">
                    <img src={cert.ImageUrl} alt="cert-img" style={{ width: '100%', height: 'auto' }} />
                  </Box>
                  <Box
                    flexBasis="30%"
                    flexGrow={1}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      px={2}
                      pt={2}
                    >
                      <Typography flexGrow={1} component={Box}>
                        <Box fontSize="h4.fontSize" fontWeight="fontWeightBold">
                          {cert.CourseName}
                        </Box>
                        <Box mt={1}>
                          {cert.Description}
                        </Box>
                        <Box mb={2}>
                          Regist course
                          {' '}
                          <Link
                            color="secondary"
                            href="https://bigocoding.com/dang-ky-hoc/"
                            target="_blank"
                          >
                            here
                          </Link>
                        </Box>
                      </Typography>
                      <Box flexGrow={1}>
                        <ButtonGroup fullWidth>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={getFile}
                          >
                            <SystemUpdateAltIcon />
                            Download
                          </Button>
                          <ShareButton
                            component={Button}
                            buttonProps={{
                              color: 'secondary',
                              variant: 'outlined',
                              fullWidth: true,
                            }}
                            url={`${window.location.origin}/users/${cert.UserId}/certificates/${cert.Id}`}
                            icon={<ShareIcon />}
                            text="Share"
                          />
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
                {/* <Paper
                  className="w-100"
                  component={Box}
                  display="flex"
                  flexDirection="column"
                  p={3}
                  mb={2}
                >
                  <Box className="certificate-preview">
                    <img src={img} alt="cert-img" style={{ width: '100%', height: 'auto' }} />
                  </Box>
                  <Box
                    px={3}
                    pt={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography style={{ minWidth: '350px' }}>
                      <Box fontSize="h4.fontSize" fontWeight="fontWeightBold">
                        {cert.CourseName}
                      </Box>
                      <Box mb={2}>
                        {cert.Description}
                      </Box>
                      <Box>
                        Regist course
                        {' '}
                        <Link
                          color="secondary"
                          href="https://bigocoding.com/dang-ky-hoc/"
                          target="_blank"
                        >
                          here
                        </Link>
                      </Box>
                    </Typography>
                    <Box m={0} style={{ minWidth: '300px' }}>
                      <ButtonGroup fullWidth>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={getFile}
                        >
                          <SystemUpdateAltIcon />
                          &nbsp;
                          Download
                        </Button>
                        <ShareButton
                          component={Button}
                          buttonProps={{
                            color: 'secondary',
                            variant: 'outlined',
                            fullWidth: true,
                          }}
                          url={`${window.location.origin}/accomplishments/certificates/${cert.Id}`}
                          icon={<ShareIcon />}
                          text="Share"
                        />
                      </ButtonGroup>
                    </Box>
                  </Box>
                </Paper> */}
              </Body>
            </div>
          )
          : (
            <LoadingPage />
          )
      }
    </div>
  );
};

export default Certificate;
