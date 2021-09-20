import React, { useState } from 'react';
import Button from './Button';

const OptionMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="option-menu position-relative d-inline">
      <Button
        className="bg-transparent dark-gray no-effect"
        onClick={() => setOpen(!open)}
        style={{ zIndex: 10 }}
      >
        <span className="fas fa-ellipsis-h" />
      </Button>
      {
        open
        && (
        <div>
          <div
            className="option-menu-body position-absolute"
            role="button"
            tabIndex={0}
            style={{ left: '100%', top: 0, zIndex: 10 }}
            onClick={() => setOpen(false)}
          >
            { children }
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div
            className="position-fixed"
            role="button"
            tabIndex={0}
            style={{
              top: 0, bottom: 0, left: 0, right: 0,
            }}
            onClick={() => setOpen(false)}
          />
        </div>
        )
      }
    </div>
  );
};

export default OptionMenu;
