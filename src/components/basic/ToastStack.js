import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Grow } from '@mui/material';
import { ToastContext } from '../../context/toast.context';

const ToastStack = () => (
  <ToastContext.Consumer>
    {
      (toastContext) => (
        <div className="toast-stack">
          {
            toastContext.notifications.map((noti, index) => (
              <Grow key={noti.Id} in>
                <Alert
                  key={noti.Id}
                  severity={noti.variant}
                  variant="filled"
                  onClose={() => toastContext.onClose(index)}
                  style={{ marginTop: '1rem' }}
                >
                  <AlertTitle>{noti.title}</AlertTitle>
                  {noti.content}
                </Alert>
              </Grow>
            ))
          }
        </div>
      )
    }
  </ToastContext.Consumer>
);

export default ToastStack;
