import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, withStyles } from '@mui/material';

export const PrimaryMuiTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}))(TableCell);

const Table = ({ width, className, children }) => (
  <table
    className={`basic-component-table ${className}`}
    style={width ? { width: width.toString() } : null}
  >
    {children}
  </table>
);
Table.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
};
Table.defaultProps = {
  width: null,
  className: '',
};

export default Table;
