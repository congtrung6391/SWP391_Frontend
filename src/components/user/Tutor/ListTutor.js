import { Grid, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import { LoadingDNA3X } from '../../common/Loading';
import SingleListTutor from './SingleListTutor';
import MuiSearch from '../../common/MuiSearch';

const ListTutor = () => {
  const userContext = useContext(UserContext);
  const [tutorList, setTutorList] = useState([]);
  const [fetched, setFetched] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;
  const [numberOfPage, setNumberOfPage] = useState(1);

  const fetchTutor = async () => {
    setFetched(false);
    const list = await userContext.getTutorList({ name: searchName, page, limit });
    setTutorList(list);
    setFetched(true);
    setNumberOfPage(Math.ceil(userContext.totalUsers/limit));
  };

  useEffect(() => {
    fetchTutor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTutor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  }

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }

  const onSearch = async () => {
    setPage(1);
    await fetchTutor();
  }

  if (!fetched) {
    return <LoadingDNA3X />
  }

  return ([
    (
      <Box flexGrow={1} sx={{ px: 1, pb: 1 }}>
        <MuiSearch
          value={searchName}
          onChange={onChangeSearchName}
          onSearch={onSearch}
        />
      </Box>
    ), (
      <Grid
        container
      >
        {
          tutorList.map((tutor) => (
            <Grid
              item
              key={tutor.id}
              md={3}
              xs={6}
              sm={4}
              sx={{
                padding: 1,
              }}
            >
              <SingleListTutor
                tutor={tutor}
              />
            </Grid>
          ))
        }
      </Grid>
    ), (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Pagination
          color="primary"
          count={numberOfPage}
          page={page || 1}
          onChange={onChangePage}
        />
      </Box>
    )
  ]);
}

export default ListTutor;
