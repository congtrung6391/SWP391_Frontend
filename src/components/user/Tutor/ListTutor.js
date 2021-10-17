import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import { LoadingDNA3X } from '../../common/Loading';
import SingleListTutor from './SingleListTutor';

const ListTutor = () => {
  const userContext = useContext(UserContext);
  const [tutorList, setTutorList] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchTutor = async () => {
      setFetched(false);
      const list = await userContext.getTutorList();
      setTutorList(list);
      setFetched(true);
    };
    fetchTutor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!fetched) {
    return <LoadingDNA3X />
  }

  return (
    <Grid
      container
    >
      {
        tutorList.map((tutor) => (
          <Grid
            key={tutor.id}
            md={3}
            xs={6}
            sm={4}
            sx={{
              padding: '0.45rem',
            }}
          >
            <SingleListTutor
              tutor={tutor}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default ListTutor;
