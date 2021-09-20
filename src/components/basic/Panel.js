import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Panel = (props) => {
  const { className, title, children } = props;
  return (
    <Card className={`panel card shadow-sm ${className}`}>
      <Card.Title className="panel-title text-center bg-light-blue">
        <h4>{title}</h4>
      </Card.Title>
      <Card.Body className="p-0">
        {children}
      </Card.Body>
    </Card>
  );
};
Panel.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
Panel.defaultProps = {
  title: '',
  className: '',
};

export default Panel;
