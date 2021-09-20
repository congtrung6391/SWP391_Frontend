import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box } from '@material-ui/core';
import UserMySubmissionList from './UserMySubmissionList';

const UserSubmission = ({ uid }) => (
  <Paper
    component={Box}
    mb={2}
    p={3}
    boxShadow={2}
  >
    <UserMySubmissionList
      apiUrl={`users/${uid}/submissions?`}
      userId={uid}
      showProblemName
    />
  </Paper>
);
UserSubmission.propTypes = {
  uid: PropTypes.number.isRequired,
};

export default UserSubmission;
