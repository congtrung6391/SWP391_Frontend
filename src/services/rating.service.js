import { APIService } from './api.service';
import { RATINGS, RATING_ID } from '../config/route';
import URLService from './URL.service';

class RatingService {
  static async getRatingList(uid, setting) {
    try {
      if (!setting.page) setting.page = 1;
      if (!setting.limit) setting.limit = 20;
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        RATINGS + "?" + queryString,
        {
          uid,
        }
      ).request();
      return {
        totalRate: response.totalRate,
        avgRate: response.avgRate,
        rateList: response.rateList,
      };
    } catch (error) {
      return {
        totalRate: 0,
        avgRate: 0,
        rateList: [],
      };
    }
  }

  static async addRating(uid, data) {
    try {
      const response = await new APIService(
        'post',
        RATINGS,
        {
          uid,
        },
        data,
        true,
      ).request();
      return response.rate;
    } catch (error) {
      return error.message;
    }
  }

  static async updateRating(uid, rid, data) {
    try {
      const response = await new APIService(
        'put',
        RATING_ID,
        {
          uid,
          rid
        },
        data,
        true,
      ).request();
      return response.rate;
    } catch (error) {
      return error.message;
    }
  }

  static async deleteRating(uid, rid) {
    try {
      await new APIService(
        'delete',
        RATING_ID,
        {
          uid,
          rid,
        },
        null,
        true,
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

export default RatingService;
