import React from 'react';
import { LanguageContext } from '../../context/language.context';
import LanguageService from '../../services/language.service';

const LS = new LanguageService();

const withLanguage = (Component, Vocabulary) => (
  (props) => (
    <LanguageContext.Consumer>
      {({ language }) => {
        LS.import(Vocabulary);
        LS.use(language);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return (<Component LS={LS} {...props} />);
      }}
    </LanguageContext.Consumer>
  )
);

export default withLanguage;
