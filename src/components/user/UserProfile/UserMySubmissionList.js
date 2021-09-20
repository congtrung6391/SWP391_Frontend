import SubmissionList from '../../common/Submission/SubmissionList';

class UserMySubmissionList extends SubmissionList {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      linkToDetail: `users/${props.userId}/submissions/`,
    };
  }
}

export default UserMySubmissionList;
