import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      // eslint-disable-next-line react/destructuring-assignment
      // step: 100 / this.props.end,
    };
  }

  componentDidMount = async () => {
    const { timer, end } = this.props;
    this.interval = setInterval(() => {
      let percentage = Math.round((timer / end) * 100);
      if (percentage >= 100) {
        percentage = 100;
      }
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(percentage)) {
        this.setState({ percentage });
        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  // renderElapsed = () => {
  //   return moment.utc(this.props.timer * 1000).format("HH:mm:ss");
  // };

  // renderRemaining = () => {
  //   if (this.props.timer < this.props.end) {
  //     return moment
  //       .utc((this.props.end - this.props.timer) * 1000)
  //       .format("HH:mm:ss");
  //   }
  //   return "00:00:00";
  // };

  render = () => {
    const { percentage } = this.state;
    const progressBarClassName = classNames({
      'progress-bar': true,
    });
    return (
      <div className="progress-contest-div">
        {/* {this.props.isInCollection && this.props.currentLevel != null && (
          <span>{this.props.currentLevel}</span>
        )} */}

        <div
          style={{
            width: '100%',
          }}
        >
          <div className={progressBarClassName}>
            <div
              className="filler"
              style={{
                width: `${
                  percentage > 0 ? percentage : 2
                }%`,
              }}
            />
          </div>
        </div>
        {/* {this.props.isInCollection && this.props.nextLevel != null && (
          <span>{this.props.nextLevel}</span>
        )} */}
      </div>
    );
  };
}

ProgressBar.propTypes = {
  timer: PropTypes.number,
  end: PropTypes.number,
};
ProgressBar.defaultProps = {
  timer: 0,
  end: 0,
};

export default ProgressBar;
