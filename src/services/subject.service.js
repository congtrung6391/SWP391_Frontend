import { APIService } from './api.service';
import { SUBJECTS } from '../config/route';

class UserService {
  static async getSubjects(uid, tokenId, googleId) {
      return [
          {
              id: 1,
              name: 'Math'
          },
          {
              id: 2,
              name: 'Physic',
          },
          {
              id: 3,
              name: 'Chemistry',
          }
      ]
    // try {
    //   await new APIService(
    //     'get',
    //     SUBJECT,
    //     {
    //       uid,
    //     },
    //     {
    //       tokenId,
    //       googleId,
    //     },
    //     true,
    //   ).request();

    //   return null;
    // } catch (error) {
    //   return error.message;
    // }
  }
}

export default UserService;
