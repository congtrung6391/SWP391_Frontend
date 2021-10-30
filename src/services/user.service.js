import URLService from './URL.service';
import {
  TUTORS, USER_PROFILE,
} from '../config/route';
import { APIService } from './api.service';

class UserService {
  static async getTutorList(setting = {}) {
    try {
      if (!setting.page) setting.page = 1;
      if (!setting.limit) setting.limit = 20;
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        TUTORS + '?' + queryString,
        {
          queryString,
        },
      ).request();
      return {
        userList: response.tutorList,
        totalUsers: response.totalUser,
      }
    } catch (error) {
      return {
        users: [],
        totalUsers: 0,
      };
    }
  }

  static async getUserProfile(id) {
    try {
      const response = await new APIService(
        'get',
        USER_PROFILE,
        {
          id,
        },
      ).request();
      return response;
    } catch (error) {
      return {};
    }
  }
}

export default UserService;
