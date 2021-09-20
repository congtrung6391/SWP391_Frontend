/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

/**
 *
 * @param {*} props 12 values:
 * * name: a string that show to user the name of input.
 * * value: a string contains value of input box.
 * * hidden: a boolean value to set whether hide input or not.
 * * disabled: a boolean value to set whether disable input or not.
 * * onChange: a callback that will be triggered when change input value.
 * * onFocus: a callback that will be triggered when focus to input.
 * * type (optional): type of input, like text, email, password, etc.
 * * placeholder (optional): text show inside input.
 * * title (optional): show when hover input.
 * * className (optional): additional classname if you want to modify input styles for your own.
 * * message (optional): pass this if you want to show message when user change input.
 * * width (optional): change input's width easier without using css
 */
const Input = (props) => {
  const {
    className,
    title,
    width,
    key,
    name,
    disabled,
    hidden,
    type,
    defaultValue,
    value,
    placeholder,
    onChange,
    onFocus,
    autoComplete,
    ref,
    message,
    error,
    helpMessage,
  } = props;
  return (
    <div
      className={`basic-component-input-div ${className}`}
      title={title}
      style={{ width: (width ? width.toString() : '100%') }}
      key={key || ''}
    >
      <label className="basic-component-input-name-label d-flex">
        {name}
        {
          helpMessage && (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`span-tooltip-${name}`}>{helpMessage}</Tooltip>}
            >
              <span
                className="far fa-question-circle ml-auto"
                style={{ fontSize: '1em' }}
              />
            </OverlayTrigger>
          )
        }
      </label>
      <input
        className="basic-component-input-input"
        disabled={!!disabled}
        hidden={!!hidden}
        type={type}
        value={value || defaultValue}
        placeholder={placeholder}
        spellCheck={false}
        onChange={onChange ? (event) => props.onChange(event.target.value) : null}
        onFocus={onFocus}
        autoComplete={autoComplete}
        ref={ref}
      />
      {
        message
        && (
        <label className={`basic-component-input-message-label ${error ? '' : 'not-error-label'}`}>
          {message}
        </label>
        )
      }
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string,
  width: PropTypes.any,
  defaultValue: PropTypes.any,
  key: PropTypes.any,
  ref: PropTypes.any,
  autoComplete: PropTypes.string,
  error: PropTypes.bool,
  helpMessage: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  name: '',
  hidden: false,
  disabled: false,
  onFocus: null,
  placeholder: '',
  title: '',
  className: '',
  message: '',
  width: '100%',
  defaultValue: '',
  key: undefined,
  ref: null,
  autoComplete: 'off',
  error: true,
  helpMessage: undefined,
};

export default Input;
