import { APIService } from './api.service';
import { SUBJECTS } from '../config/route';

class UserService {
  static async getSubjects(uid, tokenId, googleId) {
    //   return [
    //       {
    //           id: 1,
    //           name: 'Math'
    //       },
    //       {
    //           id: 2,
    //           name: 'Physic',
    //       },
    //       {
    //           id: 3,
    //           name: 'Chemistry',
    //       }
    //   ]
    try {
      const response = await new APIService(
        'get',
        SUBJECTS,
      ).request();
      return response;
    } catch (error) {
      return [];
    }
  }
}

export default UserService;
