import AdminAPIService from './adminAPI.service';
import {
  COURSE_TIMETABLE, COURSE_TIMETABLE_ID,
} from '../config/route';
import { APIService } from './api.service';

class AdminCourseService {

  static async getTimetableList(cid) {
    try {
      const response = await new APIService(
        'get',
        COURSE_TIMETABLE,
        {
          cid,
        },
      ).request();
      return response.timeTableList;
    } catch (error) {
      return [];
    }
  }

  static async addTimetable(cid, data) {
    console.log(data);
    try {
      const response = await new AdminAPIService(
        'post',
        COURSE_TIMETABLE,
        {
          cid,
        },
        data,
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async updateTimetable(cid, tid, data) {
    try {
      const response = await new AdminAPIService(
        'put',
        COURSE_TIMETABLE_ID,
        {
          cid,
          tid,
        },
        data,
      ).request();
      return response.timetable;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteTimetable(cid, tid) {
    try {
      await new AdminAPIService(
        'delete',
        COURSE_TIMETABLE_ID,
        {
          cid,
          tid,
        },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

export default AdminCourseService;
