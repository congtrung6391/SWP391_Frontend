import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import { APIService } from '../../../services/api.service';
import Editor from '../../basic/Editor/Editor';
import { LoadingDNA3X } from '../Loading';
import AdminAPIService from '../../../services/adminAPI.service';

const SubmissionDetailModal = (props) => {
  const [submission, setSubmission] = useState(undefined);
  const [fetched, setFetched] = useState(false);

  const fetchSubmission = async () => {
    try {
      let submissionDetailsApi;
      if (props.admin) {
        submissionDetailsApi = new AdminAPIService('get', props.linkToDetail, null, null);
      } else {
        submissionDetailsApi = new APIService('get', props.linkToDetail, null, null, true);
      }
      const submissionFetched = await submissionDetailsApi.request().then((res) => {
        if (!res.success) {
          return null;
        }
        const sub = res.submission;
        if (sub && sub.Tests) {
          sub.Tests = sub.Tests.map((t) => {
            const test = t;
            const keys = ['Input', 'Output', 'Answer'];
            keys.forEach((key) => {
              test[key] = Base64.decode(test[key]);
              if (test[key].length > 256) {
                test[key] = `${test[key].substring(0, 256)}...`;
              }
            });
            return test;
          });
        }
        return sub;
      });
      setSubmission(submissionFetched);
      setFetched(true);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchSubmission();
    // eslint-disable-next-line
  }, []);

  const colorizeVerdict = (inputVerdict) => {
    const verdict = inputVerdict.toLowerCase();
    if (verdict === 'accepted') {
      return { fontWeight: '600', color: '#2ecc71' };
    }
    if (verdict.includes('wrong') || verdict.includes('error')) {
      return { fontWeight: '600', color: 'red' };
    }
    if (verdict.includes('output')) {
      return { fontWeight: '600', color: '#34495e' };
    }
    if (verdict.includes('limit')) {
      return { fontWeight: '600', color: 'orange' };
    }
    return null;
  };

  return (
    <Modal
      show
      dialogClassName="modal-90w"
      // eslint-disable-next-line react/destructuring-assignment
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Bài nộp
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          !fetched
          && <LoadingDNA3X />
        }
        {
          fetched
          && (
          <div>
            <table className="basic-component-table bg-white">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>#</th>
                  <th style={{ textAlign: 'center' }}>Thời gian nộp</th>
                  <th>Người nộp</th>
                  <th>Tên bài</th>
                  <th style={{ textAlign: 'center' }}>Loại bài</th>
                  <th style={{ textAlign: 'center' }}>Ngôn ngữ</th>
                  <th>Kết quả</th>
                  <th style={{ textAlign: 'center' }}>Điểm</th>
                  <th style={{ textAlign: 'right' }}>Thời gian</th>
                  <th style={{ textAlign: 'right' }}>Bộ nhớ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="no-effect">
                  <td style={{ textAlign: 'center' }}>{submission.Id}</td>
                  <td style={{ textAlign: 'center' }}>
                    {moment(submission.SubmitTime).format('DD/MM/YYYY')}
                    <br />
                    {moment(submission.SubmitTime).format('HH:mm')}
                  </td>
                  <td><strong>{submission.User}</strong></td>
                  <td>{submission.ProblemName}</td>
                  <td style={{ textAlign: 'center' }}>{submission.ProblemTypeName}</td>
                  <td style={{ textAlign: 'center' }}>{submission.Language}</td>
                  <td style={colorizeVerdict(submission.Verdict)}>{submission.Verdict}</td>
                  <td style={{ ...colorizeVerdict(submission.Verdict), textAlign: 'center' }}>
                    {Math.round(submission.Score * 100) / 100}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {
                    submission.Time !== null
                    && `${Math.round(parseFloat(submission.Time))} ms`
                  }
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {
                    submission.Memory !== null
                    && `${Math.round(parseFloat(submission.Memory) / 1024.0)} KB`
                  }
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <Editor
              value={Base64.decode(submission.Content)}
              readOnly
              onChange={() => {}}
              onSelectionChange={() => {}}
              theme="default"
              showToolbar={false}
              mode={submission.Language}
            />
            <br />
            {
              submission.CompileMessage
              && (
              <div style={{ padding: '10px', background: 'white' }}>
                <h3 style={{ fontWeight: '600' }}>Compile message</h3>
                {
                  submission.CompileMessage.split('\n').map((message, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <p style={{ margin: '0', fontWeight: '600' }} key={index}>{message}</p>
                  ))
                }
              </div>
              )
            }
            {
              submission.Tests && submission.Tests.map((test, index) => (
                <div className="bg-white" key={test.TestcaseId} style={{ padding: '10px' }}>
                  <p style={{ fontWeight: '600' }}>
                    Test #
                    {index + 1}
                    , Time:
                    {Math.round(parseFloat(test.Time))}
                    {' '}
                    ms, Memory:
                    {Math.round(parseFloat(test.Memory) / 1024.0)}
                    {' '}
                    KB, Exit code:
                    {test.ExitCode}
                    , Verdict:
                    {test.Verdict}
                  </p>
                  <p><strong>Checker log: </strong></p>
                  <p><strong>{test.CheckerLog}</strong></p>

                  <div
                    style={{
                      textAlign: 'center', fontWeight: '600', background: '#ecf0f1', padding: '3px',
                    }}
                    className="border"
                  >
                    Input
                  </div>
                  <p style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }} className="border p-2 font-mono">
                    {test.Input}
                  </p>
                  <br />
                  <div style={{
                    textAlign: 'center', fontWeight: '600', background: '#ecf0f1', padding: '3px',
                  }}
                  >
                    Output
                  </div>
                  <p style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }} className="border p-2 font-mono">
                    {test.Output}
                  </p>
                  <br />
                  <div style={{
                    textAlign: 'center', fontWeight: '600', background: '#ecf0f1', padding: '3px',
                  }}
                  >
                    Answer
                  </div>
                  <p style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }} className="border p-2 font-mono">
                    {test.Answer}
                  </p>
                  <br />
                  {
                    index < submission.Tests.length - 1
                    && <br />
                  }
                  {
                    index < submission.Tests.length - 1
                    && <br />
                  }
                </div>
              ))
            }
          </div>
          )
        }
      </Modal.Body>
    </Modal>
  );
};

SubmissionDetailModal.propTypes = {
  admin: PropTypes.bool,
  linkToDetail: PropTypes.string.isRequired,
  onHide: PropTypes.func,
};
SubmissionDetailModal.defaultProps = {
  admin: false,
  onHide: null,
};

export default SubmissionDetailModal;
