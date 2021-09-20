import React from 'react';
import PropTypes from 'prop-types';

const CenterContainer = ({ className, style, children }) => (
  <div className={`d-flex justify-content-center ${className}`} style={{ ...style }}>
    {
      children
    }
  </div>
);
CenterContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};
CenterContainer.defaultProps = {
  className: undefined,
  style: undefined,
};

export default CenterContainer;
