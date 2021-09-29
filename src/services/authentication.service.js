import validate from 'validate.js';
import SHA256 from 'crypto-js/sha256';
import { isLoggedIn, getUserInformation } from '../utils/cookies';
import { APIService } from './api.service';
import {
  REGISTER, LOGIN, VERIFY_TOKEN,
} from '../config/route';

class AuthenticationService {
  static verifyAdministrator() {
    return ['Administrator', 'SuperAdministrator'].includes(getUserInformation('Role'));
  }

  static verifyTutor() {
    return ['Moderator', 'Administrator', 'SuperAdministrator'].includes(getUserInformation('Role'));
  }

  static verifyUser() {
    return isLoggedIn();
  }

  static async register(fullName, username, email, password, phone, role) {
    try {
      await new APIService(
        'post',
        REGISTER,
        null,
        {
          fullName,
          username,
          email,
          password,
          phone,
          role: [role],
        },
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }

  static async login(username, password) {
    try {

      const response = await new APIService(
        'post',
        LOGIN,
        null,
        {
          username,
          password,
        },
      ).request();
      response.AuthToken = response.access_token;
      response.role = response.roles[0];
      delete response.access_token;
      delete response.roles;
      return response;
    } catch (error) {
      return error.message;
    }
  }

  static async verifyToken() {
    try {
      await new APIService(
        'post',
        VERIFY_TOKEN,
        null,
        null,
        true,
      ).request();
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

export default AuthenticationService;
