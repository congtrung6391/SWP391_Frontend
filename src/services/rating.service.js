import { APIService } from './api.service';
import { RATINGS, RATING_ID } from '../config/route';
import URLService from './URL.service';

class RatingService {
  static async getRatingList(uid, setting) {
    try {
      const queryString = URLService.stringify(setting);
      const response = await new APIService(
        'get',
        RATINGS + "?" + queryString,
        {
          uid,
        }
      ).request();
      return response;
    } catch (error) {
      return [];
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

  static async deleteRating(uid, data) {
    try {
      const response = await new APIService(
        'delete',
        RATING_ID,
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
}

export default RatingService;
