import React from 'react';
import PropTypes from 'prop-types';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';
import { LoadingDNA3X } from '../Loading';
import Pagination from '../../basic/Pagination';
import history from '../../../BrowserHistory';
import { isLoggedIn } from '../../../utils/cookies';
import SubmissionDetailModal from './SubmissionDetailModal';
import SubmissionListService from '../../../services/submissionList.service';
import SingleSubmissionList from './SingleSubmissionList';

/**
 * props requirements:
 * * apiUrl: url of api to get submissions
 */
class SubmissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      submissions: [],
      totalSubmissions: 0,
      currentPage: 1,
      detailId: undefined,
      linkToDetail: props.linkToDetail,
    };

    this.refresh = undefined;
    this.countUpToFetchFull = 0;
  }

  autoRefresh = () => {
    this.refresh = setIntervalAsync(async () => {
      if (!this.props.autoRefresh) {
        await this.fetchPendingSubmissions();
      } else if (this.countUpToFetchFull % 5 !== 4) {
        await this.fetchPendingSubmissions();
      } else {
        await this.fetchSubmissionListAtSpecificPage(this.state.currentPage, false);
      }
      this.countUpToFetchFull += 1;
    }, 5000);
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = async (nextProps) => {
    if (this.props.apiUrl !== nextProps.apiUrl) return;
    await this.fetchSubmissionListAtSpecificPage();
  }

  componentDidMount = async () => {
    await this.fetchSubmissionListAtSpecificPage();
    this.autoRefresh();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.apiUrl !== prevProps.apiUrl) {
      await this.fetchSubmissionListAtSpecificPage();
    }
  }

  componentWillUnmount = async () => {
    if (this.refresh) {
      await clearIntervalAsync(this.refresh);
    }
  };

  viewDetail = (id) => {
    this.setState({ detailId: id });
  }

  fetchPendingSubmissions = async () => {
    const pending = [];
    this.state.submissions.forEach((submission) => {
      if (submission.Verdict === 'Pending'
      || submission.Verdict.includes('Judging')
      || submission.Verdict.includes('Running')) {
        pending.push(submission.Id);
      }
    });

    if (pending.length === 0) {
      if (!this.props.autoRefresh) {
        clearInterval(this.autoRefresh);
      }
      return;
    }

    const submissions = await SubmissionListService.fetchPendingSubmissions(
      pending, [...this.state.submissions],
    );

    if (submissions.length > 0) {
      this.setState(() => ({ submissions }));
    }
  };

  fetchSubmissionListAtSpecificPage = async (page = 1, showLoading = true) => {
    if (showLoading) {
      this.setState(() => ({ isLoading: true }));
    }

    const {
      submissions,
      totalSubmissions,
    } = await SubmissionListService.fetchSubmissionListAtPage(
      page,
      this.props.apiUrl,
      this.props.admin,
    );
    this.setState(() => ({
      submissions,
      totalSubmissions,
      currentPage: page,
    }));

    if (showLoading) {
      this.setState(() => ({ isLoading: false }));
    }
  };

  toSubmissionDetails = (id, index) => {
    if (!isLoggedIn()) {
      return;
    }
    if (!this.state.submissions[index].Verdict.toLowerCase().includes('pending')
        && !this.state.submissions[index].Verdict.toLowerCase().includes('judging')) {
      history.push(`${window.location.pathname}/${id}`);
    }
  };

  render = () => (
    <div>
      {
        this.state.isLoading
        && <LoadingDNA3X />
      }
      {
        !this.state.isLoading
        && (
        <table className="basic-component-table bg-white">
          <thead>
            <tr>
              <th style={{ textAlign: 'center', width: '5%' }}>#</th>
              <th style={{ textAlign: 'center' }}>Thời gian nộp</th>
              {
                this.props.showUsername
                && <th>Người nộp</th>
              }
              {
                this.props.showProblemName
                && <th>Tên bài</th>
              }
              <th style={{ textAlign: 'center' }}>Loại bài</th>
              <th style={{ textAlign: 'center' }}>Ngôn ngữ</th>
              <th>Kết quả</th>
              <th style={{ textAlign: 'center' }}>Điểm</th>
              <th style={{ textAlign: 'right' }}>Thời gian</th>
              <th style={{ textAlign: 'right' }}>Bộ nhớ</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.submissions.length === 0
              && (
                <tr className="no-effect">
                  {
                    this.props.showUsername && this.props.showProblemName
                    && <td colSpan={9} style={{ textAlign: 'center' }}>Không có bài nộp</td>
                  }
                  {
                    ((this.props.showProblemName && !this.props.showUsername)
                    || (!this.props.showProblemName && this.props.showUsername))
                    && <td colSpan={8} style={{ textAlign: 'center' }}>Không có bài nộp</td>
                  }
                  {
                    !this.props.showUsername && !this.props.showProblemName
                    && <td colSpan={7} style={{ textAlign: 'center' }}>Không có bài nộp</td>
                  }
                </tr>
              )
            }
            {
              this.state.submissions.length > 0
              && this.state.submissions.map((submission) => (
                <SingleSubmissionList
                  submission={submission}
                  key={submission.Id}
                  viewDetail={this.viewDetail}
                  showProblemName={this.props.showProblemName}
                  showUsername={this.props.showUsername}
                  restrictViewDetail={this.props.restrictViewDetail}
                />
              ))
            }
          </tbody>
        </table>
        )
      }
      {
        this.state.totalSubmissions > 20
        && (
        <Pagination
          onPageChange={this.fetchSubmissionListAtSpecificPage}
          numberOfPage={Math.ceil(this.state.totalSubmissions / 20)}
        />
        )
      }
      {
        this.state.detailId
        && (
        <SubmissionDetailModal
          submissionId={this.state.detailId}
          linkToDetail={this.state.linkToDetail + this.state.detailId}
          admin={this.props.admin}
          onHide={() => this.viewDetail(undefined)}
        />
        )
      }
    </div>
  );
}

SubmissionList.propTypes = {
  admin: PropTypes.bool,
  autoRefresh: PropTypes.bool,
  showUsername: PropTypes.bool,
  showProblemName: PropTypes.bool,
  apiUrl: PropTypes.string,
  linkToDetail: PropTypes.string,
  restrictViewDetail: PropTypes.bool,
};
SubmissionList.defaultProps = {
  admin: false,
  autoRefresh: false,
  showUsername: false,
  showProblemName: false,
  apiUrl: undefined,
  linkToDetail: '',
  restrictViewDetail: false,
};

export default SubmissionList;
