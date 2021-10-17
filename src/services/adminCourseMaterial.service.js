import AdminAPIService from './adminAPI.service';
import {
  COURSE_MATERIAL, COURSE_MATERIAL_ID,
} from '../config/route';
import URLService from './URL.service';

class AdminCourseService {

  static async getMaterialList(cid, setting) {
    try {
      if (!setting.page) setting.page = 1;
      if (!setting.limit) setting.limit = 1;
      const queryString = URLService.stringify(setting);
      const response = await new AdminAPIService(
        'get',
        COURSE_MATERIAL + '?' + queryString,
        {
          cid,
        },
      ).request();
      return {
        materialList: response.materialList,
        totalMaterial: response.totalMaterial,
      };
    } catch (error) {
      return {
        materialList: [],
        totalMaterial: 0,
      };
    }
  }

  static async addMaterial(cid, data) {
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    try {
      const response = await new AdminAPIService(
        'post',
        COURSE_MATERIAL,
        {
          cid,
        },
        form,
        {
          'Content-Type': 'multipart/form-data',
        }
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async updateMaterial(cid, mid, data) {
    const form = new FormData();
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
      if (data[key] === null) {
        form.delete(key);
      }
    });
    try {
      const response = await new AdminAPIService(
        'put',
        COURSE_MATERIAL_ID,
        {
          cid,
          mid,
        },
        form,
        {
          'Content-Type': 'multipart/form-data',
        }
      ).request();
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteMaterial(cid, mid) {
    try {
      await new AdminAPIService(
        'delete',
        COURSE_MATERIAL_ID,
        {
          cid,
          mid,
        },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

export default AdminCourseService;
