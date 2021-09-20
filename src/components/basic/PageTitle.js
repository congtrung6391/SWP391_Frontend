import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const PageTitle = ({ title, subTitle }) => (
  <Card className="shadow-sm p-2 pl-3" style={{ marginLeft: '15px', width: '100%' }}>
    <h2><strong>{title}</strong></h2>
    <h3>{subTitle}</h3>
  </Card>
);
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};
PageTitle.defaultProps = {
  subTitle: '',
};

export default PageTitle;
