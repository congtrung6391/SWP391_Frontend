import React from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from './Button';

const Modal = (props) => {
  const {
    title, closebutton, error, footer, onHide, children,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BootstrapModal dialogClassName="shadow-lg" {...props} size="lg">
      <BootstrapModal.Header className="py-2 px-3 d-flex align-items-center">
        <BootstrapModal.Title className="flex-grow-1">
          <h4 className="m-0 font-semi-bold" style={{ lineHeight: 'inherit' }}>{title}</h4>
        </BootstrapModal.Title>
        {
          closebutton === 1
          && (
            <Button
              onClick={() => onHide()}
              className={`rounded-circle ${error ? 'bg-danger' : 'bg-light-blue'}`}
            >
              <span className="fas fa-times" />
            </Button>
          )
        }
      </BootstrapModal.Header>
      <BootstrapModal.Body className="p-0">
        {children}
      </BootstrapModal.Body>
      {
        footer
        && (
        <BootstrapModal.Footer className="p-0">
          {footer}
        </BootstrapModal.Footer>
        )
      }
    </BootstrapModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  closebutton: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  footer: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};
Modal.defaultProps = {
  footer: undefined,
  error: 0,
  closebutton: 0,
};

export default Modal;
