import { APIService } from './api.service';
import URLService from './URL.service';
import {
  QUESTION, QUESTION_ID, ANSWER, ANSWER_ID,
} from '../config/route';

class ForumService {
  static getQuestionList = async (setting = {}) => {
    try {
      if (!setting.limit) setting.limit = 20;
      if (!setting.page) setting.page = 1;
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        QUESTION + '?' + queryString,
      ).request();
      return {
        questionList: response.listQuestion,
        totalQuestion: response.totalQuestion,
      };
    }catch (err) {
      return {
        questionList: [],
        totalQuestion: 0,
      };
    }
  }

  static addQuestion = async (data) => {
    try {
      const response = await new APIService(
        'post',
        QUESTION,
        {},
        data,
        true
      ).request();
      return response.questionResponse;
    } catch (error) {
      return error.message;
    }
    // return {
    //   id: 1,
    //   title: data.title,
    //   description: data.description,
    // }
  }

  static updateQuestion = async (qid, data) => {
    return {
      id: 1,
      title: data.title,
      description: data.description,
    }
  }

  static deleteQuestion = async (qid) => {
    try {
      await new APIService(
        'delete',
        QUESTION_ID,
        { qid },
        {},
        true
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static getQuestion = async (qid) => {
    try {
      const response = await new APIService(
        'post',
        QUESTION_ID,
        {qid},
        {},
        true
      ).request();
      return response.questionResponse;
    } catch (error) {
      return null;
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
