import queryString from 'query-string';
// import _ from 'lodash';
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
    // console.log( _(parsed).omitBy(_.isEmpty).value());
    // parsed = _(parsed).omitBy(_.isEmpty).value();
    // console.log(parsed);
    // console.log(queryString.stringify({ page: 1 }));
    // return queryString.stringify(parsed);

    const paramList = Object.keys(parsed).map((key) => {
      if (parsed[key]) return `${key}=${parsed[key]}`;
      return null;
    }).filter((value) => value !== null);
    const paramsString = paramList.join('&');
    console.log(paramsString);
    return paramsString;
  }
}

export default URLService;
