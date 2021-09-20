export default class LanguageService {
  constructor() {
    this.language = 'vi';
    this.setting = {};
  }

  /**
   *
   * @param {string} language - 'vi' or 'en'
   */
  use(language) {
    this.language = language;
  }

  /**
    *
    * @param {Object} setting - the object which contains the language package
    */
  import(setting) {
    const settingClone = setting;
    for (const language in setting) {
      if (Object.prototype.hasOwnProperty.call(setting, language)) {
        for (const prop in setting[language]) {
          if (Object.prototype.hasOwnProperty.call(setting[language], prop)) {
            settingClone[language][prop.toLowerCase()] = setting[language][prop];
          }
        }
      }
    }
    this.setting = settingClone;
  }

  /**
   *
   * @param {string} key - english key
   * @returns {string} a corresponding string in current language if the language
   * is available in curent setting, else return the key
   * @description translate the english key to current language
   */
  get(key) {
    if (Object.prototype.hasOwnProperty.call(this.setting, this.language)) {
      if (Object.prototype.hasOwnProperty.call(this.setting[this.language], key.toLowerCase())) {
        return this.setting[this.language][key.toLowerCase()];
      }

      return key;
    }

    return key;
  }

  static getLanguageName(id) {
    const languages = [{
      Id: 1,
      ISOCode: 'VI',
    }, {
      Id: 2,
      ISOCode: 'EN',
    }];
    const language = languages.find((lang) => lang.Id === Number.parseInt(id, 10));
    if (language) {
      return language.ISOCode;
    }
    return null;
  }
}
