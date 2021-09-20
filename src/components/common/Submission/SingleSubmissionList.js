import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getUserInformation } from '../../../utils/cookies';

import SubmissionListService from '../../../services/submissionList.service';

class SingleSubmissionList extends React.Component {
  openDetail = () => {
    const { restrictViewDetail, submission } = this.props;
    if (restrictViewDetail) {
      const user = getUserInformation();
      if (!(['Administrator', 'Moderator'].includes(user.Role) || user.username === submission.User)) return;
    }
    this.props.viewDetail(this.props.submission.Id);
  };

  render() {
    const { submission, showUsername, showProblemName } = this.props;
    return (
      <tr onClick={this.openDetail} style={{ cursor: 'pointer' }}>
        <td style={{ textAlign: 'center', width: '5%' }}>{submission.Id}</td>
        <td style={{ textAlign: 'center' }}>
          {moment(submission.SubmitTime).format('DD/MM/YYYY')}
          <br />
          {moment(submission.SubmitTime).format('HH:mm')}
        </td>
        { showUsername && <td><strong>{submission.User}</strong></td> }
        { showProblemName && <td>{submission.ProblemName}</td> }
        <td style={{ textAlign: 'center' }}>{submission.ProblemTypeName}</td>
        <td style={{ textAlign: 'center' }}>{submission.Language}</td>
        <td style={SubmissionListService.colorizeVerdict(submission.Verdict)}>
          {submission.Verdict}
          &nbsp;
          {
            (submission.Verdict.includes('Pending') || submission.Verdict.includes('Judging')
            || submission.Verdict.includes('Running'))
            && <span className="fas fa-spin fa-spinner m-auto" style={{ verticalAlign: 'middle' }} />
          }
        </td>
        <td style={{ textAlign: 'center', ...SubmissionListService.colorizeVerdict(submission.Verdict) }}>
          {Math.round((submission.Score || 0) * 100) / 100}
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
            && `${Math.round(parseFloat(submission.Memory) / 1024.0)} kb`
          }
        </td>
      </tr>
    );
  }
}

SingleSubmissionList.propTypes = {
  showProblemName: PropTypes.bool,
  showUsername: PropTypes.bool,
  submission: PropTypes.shape({
    Id: PropTypes.number,
    Language: PropTypes.string,
    Memory: PropTypes.number,
    ProblemCode: PropTypes.string,
    ProblemId: PropTypes.number,
    ProblemName: PropTypes.string,
    ProblemTypeName: PropTypes.string,
    Score: PropTypes.number,
    SubmitTime: PropTypes.string,
    Time: PropTypes.number,
    User: PropTypes.string,
    Verdict: PropTypes.string,
  }).isRequired,
  viewDetail: PropTypes.func.isRequired,
  restrictViewDetail: PropTypes.bool,
};
SingleSubmissionList.defaultProps = {
  showProblemName: false,
  showUsername: false,
  restrictViewDetail: false,
};

export default SingleSubmissionList;
