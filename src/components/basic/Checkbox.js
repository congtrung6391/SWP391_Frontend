import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} props 9 values:
 * * text: text to show what this checkbox is using for.
 * * name: name of checkbox, to group all items in checkbox.
 * * values: array of values of item that will be checked.
 * * options: array of items in checkbox, each item include:
 * - text: text of item to show to user.
 * - value: value of item, used to set checked item.
 * - hidden (optional): set this if you want to hide item.
 * - disabled (optional): set this if you want to disable item.
 * * onChange: a callback that will be triggered when user check an item.
 * * className (optional): additional classname if you want to modify checkbox styles for your own.
 * * title (optional): text to show when user hover on checkbox.
 * * hidden (optional): set this if you want to hide checkbox.
 * * disabled (optional): set this if you want to disable checkbox.
 */
const Checkbox = (props) => {
  const {
    className, hidden, disabled, width, title, text, options, name, values, onChange,
  } = props;
  return (
    <div
      className={`basic-component-checkbox-div ${className || ''}`}
      hidden={!!hidden}
      disabled={!!disabled}
      style={{ width: width ? width.toString() : '100%' }}
      title={title || ''}
    >
      {
        text
        && <label className="basic-component-checkbox-title" htmlFor={`checkbox-${name}`}>{text}</label>
      }
      {
        options && options.length > 0
        && options.map((option, index) => (
          <label
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            htmlFor={`option-${index}`}
            className={`basic-component-checkbox-select-box ${option.disabled ? 'checkbox-disabled' : ''}`}
            hidden={!!option.hidden}
            disabled={!!option.disabled}
          >
            {option.text}
            <input
              className="basic-component-checkbox-check-field"
              id={`option-${index}`}
              type="checkbox"
              name={name}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={
                onChange && !option.disabled ? (event) => onChange(event.target.value) : null
              }
            />
            <span className="basic-component-checkbox-checkmark" />
          </label>
        ))
      }
    </div>
  );
};
Checkbox.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  values: PropTypes.string,
  onChange: PropTypes.func,
};
Checkbox.defaultProps = {
  className: undefined,
  hidden: undefined,
  disabled: undefined,
  width: undefined,
  title: undefined,
  text: undefined,
  options: undefined,
  name: undefined,
  values: undefined,
  onChange: undefined,
};

export default Checkbox;
