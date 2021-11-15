import { Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
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
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [order, setOrder] = useState(0);

  const fetchTutor = async () => {
    setFetched(false);
    const list = await userContext.getTutorList({ name: searchName, page, order: order === 0 ? null : order });
    setTutorList(list.userList);
    setNumberOfPage(Math.ceil(list.totalUsers/userContext.limit));
    setFetched(true);
  };

  useEffect(() => {
    fetchTutor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(order);
    fetchTutor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order])

  const onChangePage = (event, newValue) => {
    setPage(newValue);
  }

  const onChangeSearchName = (event) => {
    setSearchName(event.target.value);
  }

  const onOrderChange = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
    console.log(event.target.value);
  }

  const onSearch = async () => {
    setPage(1);
    await fetchTutor();
  }

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="row"
        noWrap
        gap={1}
      >
        <Box flexGrow={1}>
          <MuiSearch
            value={searchName}
            onChange={onChangeSearchName}
            onSearch={onSearch}
          />
        </Box>
        <Button
          variant="contained"
          onClick={onSearch}
          color="secondary"
        >
          Search
        </Button>
        <FormControl>
          <InputLabel id="select-subject">Sort by</InputLabel>
          <Select
            id="select-order"
            label="order"
            value={order}
            onChange={onOrderChange}
            sx={{ minWidth: '8.5rem', height: '2.5rem' }}
          >
            <MenuItem
              value={0}
            >
              Random
            </MenuItem>
            <MenuItem
              value="number-rating"
            >
              Number of rating
            </MenuItem>
            <MenuItem
              value="rating"
            >
              Average rate
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
      >
        {
          fetched
            ? tutorList.map((tutor) => (
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
            : (
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                sx={{
                  padding: 1,
                  alignItems: 'center',
                }}
              >
                <LoadingDNA3X />
              </Grid>
            )
        }
      </Grid>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Pagination
          color="primary"
          count={numberOfPage || 1}
          page={page || 1}
          onChange={onChangePage}
        />
      </Box>
  </React.Fragment>);
}

export default ListTutor;
