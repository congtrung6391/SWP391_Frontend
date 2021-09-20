import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} props 8 values:
 * * options: array with each element is an object:
 * - value: value of item,
 * - text: text of item to show to user,
 * - hidden (optional): set this to hide item,
 * - disabled (optional): set this item to be disabled
 * * value: value of item that will be shown to user.
 * * onChange: a callback that will be triggered when user select an item
 * * className (optional): additional classname if you want to modify select styles for your own.
 * * title (optional): text to show when user hover on select.
 * * hidden (optional): set this if you want to hide select.
 * * disabled (optional): set this if you want to disable select.
 * * width (optional): change button's width without using css.
 */
const Select = (props) => {
  const {
    options, value, hidden, disabled, name, title, onChange, needName, width, message, className,
  } = props;
  const defaultOnChange = needName
    ? (event) => onChange(event.target.name, event.target.value)
    : (event) => onChange(event.target.value);
  return (
    <div
      hidden={!!hidden}
      title={title || ''}
      className={`basic-component-select ${className || ''}`}
    >
      {
        name && <label htmlFor={`select-${name}`}>{name}</label>
      }
      <select
        id={`select-${name}`}
        className="basic-component-select-select"
        name={name}
        onChange={onChange ? defaultOnChange : null}
        disabled={!!disabled}
        value={value}
        style={width ? { width: width.toString() } : { width: '100%' }}
      >
        {
        options && options.length > 0
        && options.map((option, index) => (
          <option
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            value={option.value ? option.value : option.text}
            hidden={!!option.hidden}
            disabled={!!option.disabled}
          >
            {option.text}
          </option>
        ))
      }
      </select>
      {
        message
        && <p style={{ color: 'red', fontSize: '13px', fontStyle: 'italic' }}>{message}</p>
      }
    </div>
  );
};
Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  needName: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};
Select.defaultProps = {
  width: '100%',
  hidden: false,
  disabled: false,
  className: '',
  title: '',
};

export default Select;
