import AdminAPIService from './adminAPI.service';
import {
  COURSE_STUDENT, COURSE_STUDENT_ID,
} from '../config/route';
import URLService from './URL.service';

class AdminCourseStudentService {
  static async replyCourseRegister(id, sid, action) {
    try {
      const response = await new AdminAPIService(
        'put',
        COURSE_STUDENT_ID,
        {
          id,
          sid,
        },
        {
          action,
        },
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async getStudentList(id, setting) {
    try {
      if (!setting.page) setting.page = 1;
      if (!setting.limit) setting.limit = 1;
      const queryString = URLService.stringify(setting);
      const response = await new AdminAPIService(
        'get',
        COURSE_STUDENT + "?" + queryString,
        {
          id,
        },
      ).request();
      return {
        studentList: response.listStudent,
        totalStudent: response.totalStudent,
      };
    } catch (error) {
      return error.message;
    }
  }

}

export default AdminCourseStudentService;
