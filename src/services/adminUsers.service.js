import _ from 'lodash';
import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  USERS, USER, USER_TYPE, USER_PASSWORD,
} from '../config/route';

class AdminUsersService {
  static async getUsers(setting) {
    try {
      // eslint-disable-next-line no-param-reassign
      setting = _(setting).omitBy(_.isEmpty).value();
      const queryString = URLService.stringify(setting);
      const response = await new AdminAPIService(
        'get',
        USERS,
        {
          queryString,
        },
      ).request();
      return {
        users: response.users,
        totalUsers: response.totalUsers,
      };
    } catch (error) {
      return {
        users: [],
        totalUsers: 0,
      };
    }
  }

  static async updateUser(id, user) {
    try {
      await new AdminAPIService(
        'put',
        USER,
        { id },
        user,
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async changePassword(id, password) {
    try {
      await new AdminAPIService(
        'put',
        USER_PASSWORD,
        null,
        {
          UserId: id,
          Password: password,
        },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async getUserTypes() {
    try {
      const response = await new AdminAPIService(
        'get',
        USER_TYPE,
      ).request();
      return response.usertypes;
    } catch (error) {
      return [];
    }
  }
}

export default AdminUsersService;
