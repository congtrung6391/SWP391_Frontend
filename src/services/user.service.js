import _ from 'lodash';
import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  TUTORS, USER_PROFILE,
} from '../config/route';
import { APIService } from './api.service';

class UserService {
  static async getTutorList(setting) {
    try {
      // eslint-disable-next-line no-param-reassign
      setting = _(setting).omitBy(_.isEmpty).value();
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        TUTORS,
        {
          queryString,
        },
      ).request();
      return {
        userList: response.tutorList,
        totalUsers: response.totalUser,
      }
      // return {
      //   users: response.users,
      //   totalUsers: response.totalUsers,
      // };
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
