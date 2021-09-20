/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} props 9 values:
 * * text: text to show what this radio is using for.
 * * name: name of radio, to group all items in radio.
 * * value: value of item that will be checked.
 * * options: array of items in radio, each item include:
 * - text: text of item to show to user.
 * - value: value of item, used to set checked item.
 * - hidden (optional): set this if you want to hide item.
 * - disabled (optional): set this if you want to disable item.
 * * onChange: a callback that will be triggered when user check an item.
 * * className (optional): additional classname if you want to modify radio styles for your own.
 * * title (optional): text to show when user hover on radio.
 * * hidden (optional): set this if you want to hide radio.
 * * disabled (optional): set this if you want to disable radio.
 */
const Radio = (props) => {
  // console.log(props);
  const {
    className, hidden, disabled, title, text, options, name, value, onChange,
  } = props;
  return (
    <div
      className={`basic-component-radio-div ${className}`}
      hidden={!!hidden}
      disabled={!!disabled}
      title={title || ''}
    >
      <label className="basic-component-radio-title" htmlFor={`radio-${name}`}>{text}</label>
      {
        options && options.length > 0
        && options.map((option, index) => (
          <label
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            htmlFor={`option-${index}`}
            className={`basic-component-radio-select-box ${option.disabled ? 'radio-disabled' : ''}`}
            hidden={!!option.hidden}
            disabled={!!option.disabled}
          >
            {option.text}
            <input
              id={`option-${index}`}
              className="basic-component-radio-check-field"
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={
                onChange
                && !option.disabled
                  ? (event) => onChange(event.target.value)
                  : null
              }
            />
            <span className="basic-component-radio-checkmark" />
          </label>
        ))
      }
    </div>
  );
};
Radio.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
Radio.defaultProps = {
  className: '',
  hidden: false,
  disabled: false,
  title: '',
  text: '',
  options: [],
  name: '',
  value: '',
  onChange: null,
};

export default Radio;
