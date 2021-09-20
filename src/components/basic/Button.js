import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton, Typography, withStyles } from '@material-ui/core';

const CustomMuiButton = withStyles(() => ({
  root: {
    textTransform: 'unset',
    fontWeight: 'normal',
  },
}))(MuiButton);

export const TextButton = (props) => {
  const { id, children, onClick } = props;

  return (
    <CustomMuiButton
      id={id}
      disableRipple
      onClick={onClick}
    >
      <Typography>{children}</Typography>
    </CustomMuiButton>
  );
};
TextButton.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
};
TextButton.defaultProps = {
  id: null,
  onClick: null,
};

/**
 *
 * @param {*} props 7 values:
 * * onClick: a callback that will be triggered when user click button.
 * * type: type of button, default is button.
 * * title (optional): text to show when user hover on button.
 * * className (optional): additional classname if you want to modify button styles for your own.
 * * width (optional): change button's width without using css.
 * * hidden (optional): set this if you want to hide button.
 * * disabled (optional): set this if you want to disable button.
 */
const Button = (props) => {
  const {
    className, title, onClick, type, style, hidden, disabled, children,
  } = props;
  return (
    <button
      className={`basic-component-button ${className}`}
      title={title}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={style}
      hidden={!!hidden}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  style: PropTypes.object,
};
Button.defaultProps = {
  className: '',
  title: '',
  onClick: null,
  type: 'button',
  hidden: null,
  disabled: false,
  style: undefined,
};

export default Button;
