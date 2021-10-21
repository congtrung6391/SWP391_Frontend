import { APIService } from './api.service';
import URLService from './URL.service';
import {
  QUESTION, QUESTION_ID, ANSWER, ANSWER_ID,
} from '../config/route';

class ForumService {
  static getQuestionList = async (setting = { page: 1, limit: 20 }) => {
    return {
      questionList: [],
      totalQuestion: 0,
    }
  }

  static addQuestion = async (data) => {
    return {
      id: 1,
      title: data.title,
      description: data.description,
    }
  }

  static updateQuestion = async (qid, data) => {
    return {
      id: 1,
      title: data.title,
      description: data.description,
    }
  }

  static deleteQuestion = async (qid) => {
    return null;
  }

  static getQuestion = async (qid) => {
    return {
      id: 1,
      title: 'Mock title',
      description: 'cdsc cd sc sdc sac werf e gert hyt j fw re wdw fe',
    }
  }

  static getAnswerList = async (qid, setting) => {
    return {
      answerList: [],
      totalAnswer: 0,
    }
  }

  static addAnswer = async (qid, data) => {
    return {
      id: 1,
      content: 'Hahaha',
      user: {},
    }
  }

  static updateAnswer = async (qid, aid, data) => {
    return {};
  }

  static deleteAnswer = async (qid, aid) => {
    return null;
  }
}
 
export default ForumService;
