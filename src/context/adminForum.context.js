/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminForumService from '../services/adminForum.service';
import { Base64 } from 'js-base64';
import ForumService from '../services/forum.service';

export const AdminForumContext = React.createContext();

class AdminForumProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      totalQuestion: 0,
      limit: 20,
      // answerList: [],
      // totalAnswer: 0,
      getQuestionList: this.getQuestionList,
      // addQuestion: this.addQuestion,
      // updateQuestion: this.updateQuestion,
      deletQuestion: this.deleteQuestion,
      // getQuestion: this.getQuestion,
      // getAnswerList: this.getAnswerList,
      // addAnswer: this.addAnswer,
      // updateAnswer: this.updateAnswer,
      // deleteAnswer: this.deleteAnswer,
    };
  }

  getQuestionList = async (setting) => {
    let { questionList, totalQuestion } = await AdminForumService.getQuestionList({ ...setting, limit: this.state.limit });
    questionList = questionList.map((q) => {
      q.description = Base64.decode(q.description);
      return q;
    });
    this.setState({ questionList: questionList, totalQuestion: totalQuestion });
    return { questionList, totalQuestion };
  }

  deleteQuestion = async (qid) => {
    const response = await ForumService.deleteQuestion(qid);
    if (!response) {
      const { questionList } = this.state;
      const index = questionList.findIndex((q) => q.id === qid);
      questionList.splice(index, 1);
      this.setState({ questionList });
    }
    return response;
  }

  render() {
    const { children } = this.props;
    return (
      <AdminForumContext.Provider value={this.state}>
        { children }
      </AdminForumContext.Provider>
    );
  }
}

export default AdminForumProvider;
