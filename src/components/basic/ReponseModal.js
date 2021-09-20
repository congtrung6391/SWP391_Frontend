import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const ResponseModal = (props) => {
  const {
    title, clearError, footer, error, message,
  } = props;
  return (
    <Modal
      title={title}
      show
      onHide={clearError}
      footer={footer}
      closebutton={1}
      error={error ? 1 : 0}
    >
      <div className="p-3">
        {
          error && (
            <ul className="list-unstyled">
              {
                error.split('\n').filter((rawErr) => rawErr.length > 0).map((err, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={idx}>
                    <span className="fas fa-times-circle light-pink" />
                    {' '}
                    {err}
                  </li>
                ))
              }
            </ul>
          )
        }
        {
          message && (
            <ul className="list-unstyled">
              {
                message.split('\n').map((messageEle, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={idx}>
                    <span className="fas fa-check-circle green" />
                    {' '}
                    {messageEle}
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </Modal>
  );
};
ResponseModal.propTypes = {
  title: PropTypes.string,
  clearError: PropTypes.func,
  footer: PropTypes.object,
  error: PropTypes.string,
  message: PropTypes.string,
};
ResponseModal.defaultProps = {
  title: '',
  clearError: null,
  footer: undefined,
  error: '',
  message: '',
};

export default ResponseModal;
