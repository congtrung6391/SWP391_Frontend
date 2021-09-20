/* eslint-disable no-useless-constructor */
import DefaultConstructor from './defaultConstructor.object';

class DefaultAdminConstructor extends DefaultConstructor {
  constructor(props) {
    super(props);
    // for(const language of ['Vi', 'En']) {
    //   if(props.hasOwnProperty(language)) {
    //     this.LanguageContent[language.toLowerCase()] = props[language];
    //   }
    // }
  }
}

export default DefaultAdminConstructor;
