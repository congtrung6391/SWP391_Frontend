import React from 'react';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import NavigationBar from '../NavigationBar';
import { LoadingDNA3X } from '../Loading';
import Body from '../../basic/Body';
import { APIService } from '../../../services/api.service';
import history from '../../../BrowserHistory';
import Editor from '../../basic/Editor/Editor';
import Page404 from '../404';

class SubmissionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      submission: undefined,
      error: false,
      urls: [['Home', '/'], ['Loading navigation bar...', '/']],
    };
  }

  componentDidMount = async () => {
    await this.setState(() => ({ isLoading: true }));
    const { match } = this.props;
    try {
      const submissionDetailsApi = new APIService('get', `submission/${match.params.submissionId}`, null, null, true);
      const { submission } = await submissionDetailsApi.request();
      this.setState(() => ({
        submission,
        isLoading: false,
      }));
      await this.generateNavigateLink();
    } catch (error) {
      await this.setState(() => ({ isLoading: false, error: true }));
    }
  };

  generateNavigateLink = async () => {
    const { match } = this.props;
    const navigateName = match.url.split('/');
    const pathName = match.path.split('/');

    navigateName.shift();
    navigateName.pop();
    pathName.shift();
    pathName.pop();

    const urls = [['Home', '/']];
    let link = '/';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < navigateName.length; ++i) {
      link += navigateName[i];
      if (pathName[i] !== ':contestId') {
        // if the navigateName is Lecture name, we add "/problems" to correctly route the pages
        if (navigateName[0] === 'courses' && i === 2) link += '/problems';

        urls.push([navigateName[i], link]);
      } else {
        const contestApi = new APIService('get', `contest/${navigateName[i]}`);
        // eslint-disable-next-line no-await-in-loop
        const contestName = (await contestApi.request()).Name;
        const tempLinkForContest = `${link}/submissions`;
        urls.push([contestName, tempLinkForContest]);
      }
      link += '/';
    }
    urls.push(['Details']);
    await this.setState(() => ({ urls }));
  };

  colorizeVerdict = (inputVerdict) => {
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

  render = () => {
    const {
      urls, isLoading, error, submission,
    } = this.state;
    return (
      <div>
        <NavigationBar
          nav={urls}
        />
        <Body>
          <Col>
            {
              isLoading
              && <LoadingDNA3X />
            }
            {
              error
              && <Page404 />
            }
            {
                !isLoading && !error
                && (
                <div>
                  <table className="basic-component-table bg-white">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th style={{ textAlign: 'center' }}>Thời gian nộp</th>
                        <th>Người nộp</th>
                        <th>Tên bài</th>
                        <th>Loại bài</th>
                        <th>Ngôn ngữ</th>
                        <th>Kết quả</th>
                        <th>Thời gian</th>
                        <th>Bộ nhớ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="no-effect">
                        <td>{submission.InternalId}</td>
                        <td style={{ textAlign: 'center' }}>
                          {moment(submission.SubmitTime).format('DD/MM/YYYY')}
                          <br />
                          {moment(submission.SubmitTime).format('HH:mm')}
                        </td>
                        <td
                          style={{ cursor: 'pointer', fontWeight: '600' }}
                        >
                          <div role="button" tabIndex={0} onClick={() => history.push(`/user/${submission.User}`)}>{submission.User}</div>
                        </td>
                        <td>
                          {submission.ProblemName.Vi
                            ? submission.ProblemName.Vi
                            : submission.ProblemName.En}
                        </td>
                        <td>{submission.Type}</td>
                        <td>{submission.Language}</td>
                        <td style={this.colorizeVerdict(submission.Verdict)}>
                          {submission.Verdict}
                        </td>
                        <td>
                          {Math.round(parseFloat(submission.Time))}
                          {' '}
                          ms
                        </td>
                        <td>
                          {Math.round(parseFloat(submission.Memory) / 1024.0)}
                          {' '}
                          KB
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <Editor
                    value={submission.Content}
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
                      <div className="bg-white" key={test.Id} style={{ padding: '10px' }}>
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
                        <p style={{ whiteSpace: 'pre-line' }} className="border p-2 font-mono">
                          {test.Input}
                        </p>
                        <br />
                        <div style={{
                          textAlign: 'center', fontWeight: '600', background: '#ecf0f1', padding: '3px',
                        }}
                        >
                          Output
                        </div>
                        <p style={{ whiteSpace: 'pre-line' }} className="border p-2 font-mono">
                          {test.Output}
                        </p>
                        <br />
                        <div style={{
                          textAlign: 'center', fontWeight: '600', background: '#ecf0f1', padding: '3px',
                        }}
                        >
                          Answer
                        </div>
                        <p style={{ whiteSpace: 'pre-line' }} className="border p-2 font-mono">
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
          </Col>
        </Body>
      </div>
    );
  }
}

export default SubmissionDetails;
