import React from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';
import PropTypes from 'prop-types';

class Datetime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      value: '--/--/--',
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (value) {
      const handledValue = moment(Number(value) || value).set({ second: 0 });
      this.setState({ value: handledValue });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.value === nextState.value && this.state.value === nextProps.value) return false;
    return true;
  }

  onChange = (newValue) => {
    if (newValue instanceof moment || newValue === '') {
      const handledNewValue = newValue ? newValue.valueOf() : null;
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            value: handledNewValue,
            name: this.props.name,
            id: this.props.id,
          },
        });
      }
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
    this.setState({ value: newValue });
  }

  render() {
    const {
      id,
      className,
      initialViewDate,
      dateFormat,
      timeFormat,
      disabled,
      isValidDate,
    } = this.props;
    const { value, error } = this.state;
    return (
      <div>
        <DateTime
          id={id}
          className={`basic-component-datetime-picker ${className}`}
          initialViewDate={initialViewDate}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          defaultValue={value}
          value={value}
          onChange={this.onChange}
          isValidDate={isValidDate}
          inputProps={{ disabled }}
        />
        {
          error && <div className="text-danger"><em>Wrong format</em></div>
        }
      </div>
    );
  }
}

Datetime.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  timeFormat: PropTypes.bool,
  dateFormat: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  isValidDate: PropTypes.func,
  initialViewDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
Datetime.defaultProps = {
  value: 0,
  className: '',
  initialViewDate: moment(),
  id: undefined,
  dateFormat: true,
  timeFormat: true,
  onChange: null,
  disabled: false,
  isValidDate: () => true,
};

export default Datetime;
