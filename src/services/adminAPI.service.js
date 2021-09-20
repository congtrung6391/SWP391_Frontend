import { APIService } from './api.service';
import { BASE } from '../config/route';

class AdminAPIService extends APIService {
  constructor(method, url = '', params = {}, data = {}, headers = {}, cancelToken = null) {
    super(method, url, params, data, true, headers, cancelToken);
    this.url = `${BASE}admin/${url}`;
  }
}

export default AdminAPIService;
