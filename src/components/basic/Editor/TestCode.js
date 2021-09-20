import React from 'react';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import CodeMirror from './CodeMirror';

const TestCodeResult = ({ submission, closeSubmit }) => {
  if (!submission) {
    return null;
  }

  return (
    <div className="test-code-result" style={{ height: '100%' }}>
      <div
        className="p-1 pl-2 font-weight-bold w100 d-flex"
        style={{ height: '2rem' }}
      >
        {
          submission.Verdict === 'Success'
            ? (
              <p className="green"><strong>{submission.Verdict}</strong></p>
            )
            : (
              <p className="text-danger"><strong>{submission.Verdict}</strong></p>
            )
        }
        <p className="font-weight-light ml-auto mr-2">
          {'Time: '}
          {submission.Time}
          (ms)
          {' / Memory: '}
          {parseInt(submission.Memory / 1024, 10)}
          (KB)
        </p>
        <button
          className="basic-component-button bg-light-pink text-white"
          type="button"
          onClick={closeSubmit}
        >
          <span className="fas fa-trash" />
        </button>
      </div>
      <hr className="m-0" />
      {
        submission.CheckerLog
        && (
          <div style={{ height: 'calc(100% - 2rem)' }}>
            <CodeMirror
              value={submission.CheckerLog}
              readOnly
              lineNumbers={false}
              mode="text"
              theme="default"
              cursorBlinkRate={-1}
            />
          </div>
        )
      }
      {
        submission.OutputRun
        && (
          <div style={{ height: 'calc(100% - 2rem)' }}>
            <CodeMirror
              value={Base64.decode(submission.OutputRun)}
              readOnly
              lineNumbers={false}
              mode="text"
              theme="default"
              cursorBlinkRate={-1}
            />
          </div>
        )
      }
    </div>
  );
};

TestCodeResult.propTypes = {
  submission: PropTypes.shape({
    CheckerLog: PropTypes.string,
    Memory: PropTypes.number,
    Time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Verdict: PropTypes.string,
    OutputRun: PropTypes.string,
    message: PropTypes.any,
    status: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
    }),
    stderr: PropTypes.any,
    stdout: PropTypes.string,
  }).isRequired,
  closeSubmit: PropTypes.func,
};

TestCodeResult.defaultProps = {
  closeSubmit: () => {},
};

export default TestCodeResult;
