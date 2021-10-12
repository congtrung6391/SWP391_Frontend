import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { logOut, getUserInformation } from '../utils/cookies';
import { BASE } from '../config/route';
import history from '../BrowserHistory';

// eslint-disable-next-line import/prefer-default-export
export class APIService {
  /**
   * @param {string} method - 'get', 'post', 'put' or 'delete'
   * @param {string} url - original url without specific parameter
   * @param {object} params - an object contains all url parameter,
   * object key must be the same as parameter key
   * @param {object} data - the data which you want to send
   * @param {boolean} auth
   *
   * @description create an api
   *
   * @example
   * const request =  new APIService(
   *  'get',
   *  '/problems?pattern=:pattern&tag=:tag',
   *  {
   *    pattern: 'farmer',
   *    tag: 'sorting'
   *  },
   *  undefined,
   *  undefined
   * )
   */
  constructor(method, url = '', params = {}, data = {}, auth, headers = {}, cancelToken = null) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      this.url = url;
    } else {
      this.url = `${BASE}public/${url}`;
    }

    this.params = params;
    if (params) {
      if (Object.prototype.hasOwnProperty.call(params, 'page')
        && params.page === 0
      ) {
        this.params.page = 1;
      }
    }

    this.data = data;
    this.method = method;
    this.headers = {
      accept: 'application/json',
      ...headers,
    };
    if (!!!headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/json';
    }

    if (auth) {
      this.headers.Authorization = `Bearer ${getUserInformation('AuthToken')}`;
    }

    if (cancelToken) {
      this.cancelToken = cancelToken;
    }
  }

  createPackage() {
    for (const p in this.params) {
      if (Object.prototype.hasOwnProperty.call(this.params, p)) {
        this.url = this.url.replace(`:${p}`, this.params[p]);
      }
    }
    return ({
      url: this.url,
      method: this.method,
      headers: this.headers,
      data: this.data,
      cancelToken: this.cancelToken,
    });
  }

  async createRequest() {
    const response = await axios(this.createPackage());
    return response.data;
  }

  /**
   * @description create request to server and get data
   */
  async request() {
    try {
      const data = await this.createRequest();
      return data;
    } catch (error) {
      if (error.response) {
        const { response } = error;
        if (response
          && response.data
          && response.data.message
          && response.data.message.includes('Found another login')) {
          logOut();
          history.push('/');
          window.location.reload();
        } else {
          throw new Error(response.data.message);
        }
      } else {
        throw new Error(error.message);
      }
      return error;
    }
  }
}
