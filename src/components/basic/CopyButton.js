import React from 'react';
import PropType from 'prop-types';
import { ToastContext } from '../../context/toast.context';

class CopyButton extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  onClick = () => {
    const { contentId } = this.props;
    const element = document.getElementById(contentId);
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    this.ToastContext.addNotification('Big-O Coder', 'Copied');
  }

  render() {
    return (
      <ToastContext.Consumer>
        {
          (context) => {
            this.ToastContext = context;
            return (
              <button
                type="button"
                className="bg-white border float-right corner"
                style={{ fontSize: '11px' }}
                onClick={this.onClick}
              >
                copy
              </button>
            );
          }
        }
      </ToastContext.Consumer>
    );
  }
}
CopyButton.propTypes = {
  contentId: PropType.string.isRequired,
};

export default CopyButton;
