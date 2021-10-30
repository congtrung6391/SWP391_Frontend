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
        'get',
        QUESTION_ID,
        {qid},
        {},
        true
      ).request();
      if (response.userInformationResponse) {
        response.user = response.userInformationResponse;
      }
      return response.questionResponse;
    } catch (error) {
      return null;
    }
  }

  static getAnswerList = async (qid, setting) => {
    try {
      if (!setting.limit) setting.limit = 20;
      if (!setting.page) setting.page = 1;
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        ANSWER + '?' + queryString,
        {
          qid
        }
      ).request();
      return {
        answerList: response.list,
        totalAnswer: response.size,
      };
    }catch (err) {
      return {
        answerList: [],
        totalAnswer: 0,
      };
    }
  }

  static addAnswer = async (qid, data) => {
    try {
      const response = await new APIService(
        'post',
        ANSWER,
        {
          qid
        },
        data,
        true
      ).request();
      return response.answer;
    } catch (err) {
      return err.message;
    }
  }

  static updateAnswer = async (qid, aid, data) => {
    try {
      const response = await new APIService(
        'put',
        ANSWER_ID,
        {
          qid,
          aid,
        },
        data,
        true
      ).request();
      return response.answer;
    } catch (err) {
      return err.message;
    }
  }

  static deleteAnswer = async (qid, aid) => {
    try {
      await new APIService(
        'delete',
        ANSWER_ID,
        {
          qid,
          aid,
        },
        {},
        true
      ).request();
      return null;
    } catch (err) {
      return err.message;
    }
  }
}
 
export default ForumService;
