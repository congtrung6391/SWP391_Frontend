/* eslint-disable react/no-unused-state */
import React from 'react';
import uniqid from 'uniqid';

export const ToastContext = React.createContext();

class ToastProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      addNotification: this.addNotification,
      onClose: this.onClose,
      timer: undefined,
    };
  }

  addNotification = (title, content, variant = 'success') => {
    const { timer } = this.state;
    clearTimeout(timer);
    const { notifications } = this.state;
    notifications.push({
      title, content, Id: uniqid(), variant,
    });
    this.setState({
      notifications,
      timer: setInterval(async () => {
        this.onClose();
      }, 4000),
    });
  }

  onClose = (index = 0) => {
    const { notifications } = this.state;
    notifications.splice(index, 1);
    this.setState({ notifications });
  }

  render() {
    const { children } = this.props;
    return (
      <ToastContext.Provider value={this.state}>
        {children}
      </ToastContext.Provider>
    );
  }
}

export default ToastProvider;
