import React, { useContext, useEffect, useState } from 'react';
import {
  // Typography,
  Box,
  // Grid,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Pagination,
  FormControl,
  // InputLabel,
  Select,
  MenuItem,
  IconButton,
  // TextField,
  Button,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingDNA3X } from '../../common/Loading';
// import PaginationList from '../../basic/PaginationList';
import URLService from '../../../services/URL.service';
import AdminUsersService from '../../../services/adminUsers.service';
// import SingleUser from './SingleUser';
// import UserTypeProvider, { UserTypeContext } from '../../../context/usertype.context';
import { AdminUserContext } from '../../../context/adminUser.context';
import { ToastContext } from '../../../context/toast.context';
import MuiSearch from '../../common/MuiSearch';

const ListUsers = () => {
  const itemPerPage = 20;
  const userContext = useContext(AdminUserContext);
  // const userTypeContext = useContext(UserTypeContext);
  const toastContext = useContext(ToastContext);
  const [fetched, setFetched] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberofPages] = useState(1);

  useEffect(() => {
    const { page: pageUrl, search: searchUrl } = URLService.getAllQueryString();
    setPage(Number(pageUrl) || 1);
    setSearch(searchUrl);
  }, [])

  const onPageChange = (event, value) => {
    setPage(value);
  }

  const fetchUsers = async () => {
    try {
      const setting = URLService.getAllQueryString();
      setting.key = setting.search;
      await AdminUsersService.getUserList(setting);
      setFetched(true);
      setNumberofPages(Math.ceil(userContext.totalUsers / itemPerPage));
    } catch (error) {
      setFetched(true);
    }
  };

  const onChangeUserRole = async (event, username) => {
    const response = await userContext.changeUserRole(event.target.value, username);
    if (response === null) {
      toastContext.addNotification('Change role success');
    } else {
      toastContext.addNotification('Change role failed', response, 'error');
    }
  }

  const onDeleteUser = async (id) => {
    console.log(id);
    if (window.confirm('This action cannot be undo, are you sure?')) {
      const response = await userContext.deleteUser(id);
      if (response === null) {
        toastContext.addNotification('Delete user success');
      } else {
        toastContext.addNotification('Delete user failed', response, 'error');
      }
    }
  }

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search])

  // const refresh = async () => {
  //   setFetched(true);
  //   URLService.setQueryString('page', this.state.page);
  //   await fetchUsers();
  // }

  if (!fetched) {
    return <LoadingDNA3X />;
  }

  return (
    <Box>
      <Box mb={1} display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <MuiSearch />
        </Box>
        <Button
          disableFocusRipple
          disableRipple
          disableElevation
          variant="contained"
          color="primary"
        >
          {`Total users: ${userContext.totalUsers}`}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'primary.contrastText' }}>#</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Username</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Email</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Fullname</TableCell>
              <TableCell sx={{ color: 'primary.contrastText' }}>Role</TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'primary.contrastText' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              userContext.userList.map((user, index) => (
                <TableRow key={user.username}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        id="demo-simple-select"
                        value={user.role[0].userRole}
                        onChange={(event) => onChangeUserRole(event, user.username)}
                        sx={{ minWidth: '8.5rem', height: '1.4rem' }}
                        variant="standard"
                      >
                        <MenuItem value='SUPER_ADMIN'>Super Admin</MenuItem>
                        <MenuItem value='ADMIN'>Admin</MenuItem>
                        <MenuItem value='TUTOR'>Tutor</MenuItem>
                        <MenuItem value='STUDENT'>Student</MenuItem>
                        {/* {
                          userTypeContext.usertypes.map((type) => (
                            <MenuItem value={type.name}>{type.name}</MenuItem>
                          ))
                        } */}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onDeleteUser(user.id)}>
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Box py={1} display="flex" flexDirection="row" justifyContent="center">
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={onPageChange}
            variant="outlined"
            color="primary"
            sx={{ justifyContent: 'center' }}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default ListUsers;
