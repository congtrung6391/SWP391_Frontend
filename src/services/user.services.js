import { APIService } from './api.service';
import { CONNECT_GOOGLE, CONNECT_FACEBOOK } from '../config/route';

class UserService {
  static async connectGoogle(uid, tokenId, googleId) {
    try {
      await new APIService(
        'post',
        CONNECT_GOOGLE,
        {
          uid,
        },
        {
          tokenId,
          googleId,
        },
        true,
      ).request();

      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async disconnectGoogle(uid) {
    try {
      await new APIService(
        'delete',
        CONNECT_GOOGLE,
        {
          uid,
        },
        null,
        true,
      ).request();

      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async connectFacebook(uid, accessToken, userID) {
    try {
      await new APIService(
        'post',
        CONNECT_FACEBOOK,
        {
          uid,
        },
        {
          accessToken,
          userID,
        },
        true,
      ).request();

      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async disconnectFacebook(uid) {
    try {
      await new APIService(
        'delete',
        CONNECT_FACEBOOK,
        {
          uid,
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

export default UserService;
