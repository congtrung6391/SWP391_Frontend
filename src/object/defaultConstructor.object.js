class DefaultConstructor {
  constructor(props) {
    if (props) {
      this.updateProperty(props);
      this.LanguageContent = {};
      for (const language of ['Vi', 'En']) {
        if (Object.prototype.hasOwnProperty.call(props, language) && props[language].Name) {
          this.LanguageContent[language.toLowerCase()] = props[language];
        }
      }
    }
  }

  updateProperty(props) {
    if (props) {
      for (const prop in props) {
        if (Object.prototype.hasOwnProperty.call(props, prop)) {
          this[prop] = props[prop];
        }
      }
    }
  }

  canGetLanguage(language) {
    if (Object.prototype.hasOwnProperty.call(this.LanguageContent, language)
        && this.LanguageContent[language].Name) {
      return language;
    }

    for (const languageContent in this.LanguageContent) {
      if (Object.prototype.hasOwnProperty.call(this.LanguageContent, languageContent)) {
        return language;
      }
    }

    return null;
  }

  getLanguageContent(language = 'vi') {
    if (Object.prototype.hasOwnProperty.call(this.LanguageContent, language)) {
      return this.LanguageContent[language];
    }

    for (const languageContent in this.LanguageContent) {
      if (Object.prototype.hasOwnProperty.call(this.LanguageContent, languageContent)) {
        return this.LanguageContent[languageContent];
      }
    }

    return null;
  }

  // Return the different prop of b in a
  static getDifferent(a, b, exception = []) {
    if (!exception.includes('Id')) {
      exception.push('Id');
    }
    const c = {};
    for (const prop in b) {
      if (a[prop] === undefined || (a[prop] !== b[prop] && b[prop] === null)) {
        c[prop] = b[prop];
      } else if (Array.isArray(b[prop])) {
        if (JSON.stringify(a[prop]) !== JSON.stringify(b[prop])) {
          c[prop] = b[prop];
        }
      } else if (typeof b[prop] === 'object' && JSON.stringify(a[prop]) !== JSON.stringify(b[prop])) {
        c[prop] = DefaultConstructor.getDifferent(a[prop], b[prop], exception);
      } else if (typeof b[prop] !== 'object') {
        if (a[prop] !== b[prop]) {
          c[prop] = b[prop];
        } else if (exception.includes(prop)) {
          c[prop] = b[prop];
        }
      }
    }
    return c;
  }
}

export default DefaultConstructor;
