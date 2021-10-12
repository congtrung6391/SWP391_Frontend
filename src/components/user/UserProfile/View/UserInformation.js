import React from 'react';
import MomentUtils from '@date-io/moment';
import {
  Box,
  Paper,
  TextField,
  Typography,
  TableCell,
  TableRow,
  Table,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
} from '@mui/lab';

const UserInformation = ({ user }) => {

  return (
    <Paper
      component={Box}
      mb={2}
      p={3}
      boxShadow={2}
    >
      <Typography component={Box}>
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
          Personal Information
        </Box>
      </Typography>
      <Table>
        <TableRow>
          <TableCell>
            <Typography>
              Fullname:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.fullName}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Email:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.email}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Phone:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.phone}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Address:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.address}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Facebook:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.facebookUrl}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Affiliation:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.affiliation}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Date of birth:
            </Typography>
          </TableCell>
          <TableCell>
            <LocalizationProvider dateAdapter={MomentUtils}>
              <DatePicker
                disabled
                inputVariant="outlined"
                id="birthday-picker-dialog"
                label="Ngày sinh"
                format="DD/MM/YYYY"
                value={user.birthday}
                KeyboardButtonProps={{
                  'aria-label': 'change birthday',
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              GPA:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.gpa}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>
              Gender:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {user.gender}
            </Typography>
          </TableCell>
        </TableRow>
      </Table>
    </Paper>
  );
};

export default UserInformation;
