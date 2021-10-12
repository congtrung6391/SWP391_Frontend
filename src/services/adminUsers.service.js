import _ from 'lodash';
import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  USERS, USER, USER_TYPE, USER_ROLE,
} from '../config/route';

class AdminUsersService {
  static async getUserList(setting) {
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
        users: response.userList,
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

  static async changeUserRole(role, username) {
    try {
      await new AdminAPIService(
        'post',
        USER_ROLE,
        { id: username },
        { role: role },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteUser(id) {
    try {
      await new AdminAPIService(
        'delete',
        USER,
        { id },
      ).request();
      return null;
    } catch (error) {
      return error.message;
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

  // static async changePassword(id, password) {
  //   try {
  //     await new AdminAPIService(
  //       'put',
  //       USER_PASSWORD,
  //       null,
  //       {
  //         UserId: id,
  //         Password: password,
  //       },
  //     ).request();
  //     return null;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

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
