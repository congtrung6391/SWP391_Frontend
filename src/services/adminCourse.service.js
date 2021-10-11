import _ from 'lodash';
import AdminAPIService from './adminAPI.service';
import URLService from './URL.service';
import {
  COURSES, COURSE_ID, COURSE_INFO, USERS, USER, USER_TYPE, COURSE_REGISTER,
} from '../config/route';
import { APIService } from './api.service';

class AdminCourseService {

  static async getCourseList(name = "", page = 1, limit = 20) {
    try {
      const response = await new AdminAPIService(
        'get',
        COURSES,
        null,
      ).request();
      return {
        courseList: response.courseList,
        totalCourse: response.totalCourse,
      };
    } catch (error) {
      return error.message;
    }
  }

  static async createCourse(info) {
    try {
      const response = await new AdminAPIService(
        'post',
        COURSES,
        null,
        info,
      ).request();
      return response.course;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteCourse(id) {
    try {
      await new AdminAPIService(
        'delete',
        COURSE_ID,
        { id },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async getCourse(id) {
    try {
      const response = await new AdminAPIService(
        'get',
        COURSE_INFO,
        { id },
      ).request();
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async updateCourse(id, data) {
    try {
      const response = await new AdminAPIService(
        'put',
        COURSE_ID,
        { id },
        data,
      ).request();
      return response.course;
    } catch (error) {
      return error.message;
    }
  }

  static async replyCourseRegister(id, action) {
    try {
      const response = await new AdminAPIService(
        'put',
        COURSE_REGISTER,
        { id },
        {
          action,
        },
      ).request();
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }

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
        users: response,
        totalUsers: response.length,
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
}

export default AdminCourseService;
