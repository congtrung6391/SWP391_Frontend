import { APIService } from './api.service';
import URLService from './URL.service';
import {
  QUESTION,
} from '../config/route';
import AdminAPIService from './adminAPI.service';

class AdminForumService {
  static getQuestionList = async (setting = {}) => {
    try {
      if (!setting.limit) setting.limit = 20;
      if (!setting.page) setting.page = 1;
      const queryString = URLService.stringify(setting);
      const response = await new AdminAPIService(
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
}
 
export default AdminForumService;
