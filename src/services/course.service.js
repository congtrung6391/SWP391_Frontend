import _ from 'lodash';
import { APIService } from './api.service';
import URLService from './URL.service';
import {
  COURSES, COURSE_ID
} from '../config/route';

class AdminCourseService {

  static async getCourseList(setting) {
    try {
      const response = await new APIService(
        'get',
        COURSES,
        null,
      ).request();
      return {
        courseList: response,
        totalCourse: response.length,
      };
    } catch (error) {
      return error.message;
    }
  }

  static async getCourse(id) {
    try {
      const response = await new APIService(
        'get',
        COURSE_ID,
        { id },
      ).request();
      console.log(response);
      return response.course;
    } catch (error) {
      return error.message;
    }
  }
}

export default AdminCourseService;
