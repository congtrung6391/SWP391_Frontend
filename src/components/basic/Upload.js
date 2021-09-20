import React from 'react';
import { PropTypes } from 'prop-types';
import uniqid from 'uniqid';

const UploadInput = (props) => {
  const {
    label, name, id, accept, disabled, onChange,
  } = props;

  return (
    <div className="custom-upload">
      {
        label && (
          <label htmlFor={id}>{label}</label>
        )
      }
      <input
        type="file"
        name={name}
        id={id}
        disabled={disabled}
        onChange={onChange}
        accept={accept}
      />
    </div>
  );
};

UploadInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  accept: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

UploadInput.defaultProps = {
  name: 'custom-upload',
  label: undefined,
  accept: 'all',
  id: uniqid(),
  disabled: false,
  onChange: null,
};

export default UploadInput;
