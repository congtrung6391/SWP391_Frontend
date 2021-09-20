import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../common/Loading';

class ToggleCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggling: false,
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onChange = async () => {
    const { disabled } = this.props;
    if (disabled) return;
    this.setState({ toggling: true });
    const {
      onChange, checked, name, id,
    } = this.props;
    try {
      await onChange({
        target: {
          value: !checked,
          checked: !checked,
          name,
          id,
        },
      });
    } catch (error) {
      // console.log(error);
    }
    if (this.mounted) {
      this.setState({ toggling: false });
    }
  }

  render() {
    const { toggling } = this.state;
    const {
      className, checked, label, labelClassName,
    } = this.props;

    if (toggling) {
      return <Loading className={className} />;
    }

    return (
      <span
        role="checkbox"
        tabIndex={0}
        aria-checked={false}
        onClick={this.onChange}
        style={{ cursor: 'pointer' }}
      >
        {
          checked
            ? <span className={`fas fa-check-square ${className}`} style={{ fontSize: '18px' }} />
            : <span className={`fas fa-square ${className}`} style={{ fontSize: '18px' }} />
        }
        {
          label
          && (
          <span className={labelClassName}>
            {label}
          </span>
          )
        }
      </span>
    );
  }
}
ToggleCheckbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
};
ToggleCheckbox.defaultProps = {
  className: '',
  checked: false,
  label: null,
  labelClassName: '',
  onChange: null,
  id: null,
  name: null,
  disabled: false,
};

export default ToggleCheckbox;
