import React from 'react';
import PropTypes from 'prop-types';

const Textarea = (props) => {
  const {
    className,
    id,
    width,
    name,
    disabled,
    hidden,
    value,
    placeholder,
    defaultValue,
    onChange,
    onFocus,
    message,
  } = props;
  // console.log(props);
  return (
    <div
      className={`basic-component-textarea-div ${className || ''}`}
      id={id || ''}
      style={{ width: width ? width.toString() : '100%' }}
    >
      <label className="basic-component-textarea-name-label" htmlFor={`textare-${name}`}>{name || ''}</label>
      <textarea
        id={`textare-${name}`}
        className="basic-component-textarea-textarea"
        disabled={!!disabled}
        hidden={!!hidden}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue || ''}
        spellCheck={false}
        onChange={onChange ? (event) => onChange(event.target.value) : null}
        onFocus={onFocus || null}
        autoComplete="off"
        rows={5}
      />
      {
        message
        && (
        <label className="basic-component-textarea-message-label" htmlFor="message-textarea">
          {message}
        </label>
        )
      }
    </div>
  );
};
Textarea.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.bool,
  message: PropTypes.string,
};
Textarea.defaultProps = {
  className: '',
  id: '',
  width: null,
  name: '',
  disabled: null,
  hidden: null,
  value: null,
  placeholder: '',
  defaultValue: '',
  onChange: null,
  onFocus: null,
  message: '',
};

export default Textarea;
