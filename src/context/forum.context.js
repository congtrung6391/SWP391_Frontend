/* eslint-disable react/no-unused-state */
import React from 'react';
import ForumService from '../services/forum.service';

export const ForumContext = React.createContext();

class ForumProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      totalQuestion: 0,
      answerList: [],
      totalAnswer: 0,
      getQuestionList: this.getQuestionList,
      addQuestion: this.addQuestion,
      updateQuestion: this.updateQuestion,
      deletQuestion: this.deleteQuestion,
      getQuestion: this.getQuestion,
      getAnswerList: this.getAnswerList,
      addAnswer: this.addAnswer,
      updateAnswer: this.updateAnswer,
      deleteAnswer: this.deleteAnswer,
    };
  }

  getQuestionList = async (setting = {page: 1, limit: 20}) => {
    const response = await ForumService.getQuestionList(setting);
    this.setState({ questionList: response.questionList, totalQuestion: response.totalQuestion });
    return response;
  }

  addQuestion = async (data) => {
    const response = await ForumService.addQuestion(data);
    return response;
  }

  updateQuestion = async (qid, data) => {
    const response = await ForumService.updateQuestion(qid, data);
    return response;
  }

  deleteQuestion = async (qid) => {
    const response = await ForumService.deleteQuestion(qid);
    return response;
  }

  getQuestion = async (qid) => {
    const { questionList } = this.state;
    const question = questionList.find((q) => q.id === qid);
    if (question) {
      return question;
    }

    const response = await ForumService.getQuestion(qid);
    return response;
  }

  getAnswerList = async (qid, setting) => {
    const response =  await ForumService.getAnswerList(qid, setting);
    this.setState({ answerList: response.answerList, totalAnswer: response.totalAnswer });
    return response;
  }

  addAnswer = async (qid, data) => {
    const response = await ForumService.addAnswer(qid, data);
    return response;
  }

  updateAnswer = async (qid, aid, data) => {
    const response = await ForumService.updateAnswer(qid, aid, data);
    return response;
  }

  deletQuestion = async (qid, aid) => {
    const response = await ForumService.deleteAnswer(qid, aid);
    return response;
  }

  render() {
    const { children } = this.props;
    return (
      <ForumContext.Provider value={this.state}>
        { children }
      </ForumContext.Provider>
    );
  }
}

export default ForumProvider;
