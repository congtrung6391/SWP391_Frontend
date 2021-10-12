import { Grid } from '@mui/material';
import React from 'react';
import Body from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import ListTutor from './ListTutor';

const TutorPage = (props) => {
  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Tutors'],
        ]}
      />
      <Body>
        <Grid
          item
          md={12}
          xs={12}
        >
          <ListTutor />
        </Grid>
      </Body>
    </>
  );
}

export default TutorPage;