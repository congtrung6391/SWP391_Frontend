import queryString from 'query-string';
import _ from 'lodash';
import history from '../BrowserHistory';

class URLService {
  static getAllQueryString() {
    return queryString.parse(window.location.search);
  }

  static getQueryString(key) {
    return this.getAllQueryString()[key];
  }

  static setQueryString(key, value) {
    const parsed = this.getAllQueryString();
    parsed[key] = value;
    const stringified = queryString.stringify(parsed);
    history.replace({
      pathname: window.location.pathname,
      search: stringified,
    });
  }

  static stringify(parsed) {
    parsed = _(parsed).omitBy(_.isEmpty).value();
    return queryString.stringify(parsed);
  }
}

export default URLService;
