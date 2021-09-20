import React from 'react';
import PropTypes from 'prop-types';
import LanguageService from '../../services/language.service';

const ContentLanguageBar = (props) => {
  const {
    languages, activeLanguage, setLanguage, add, addLanguage,
  } = props;

  return (
    <span className="language-content-bar">
      {
        languages.map((language, index) => (
          <button
            type="button"
            key={language.Id}
            className={activeLanguage === index ? 'active' : ''}
            onClick={(event) => setLanguage(event, index, language.Id)}
          >
            { LanguageService.getLanguageName(language.Id) }
          </button>
        ))
      }
      &nbsp;
      {
        add
        && (
        <button
          type="button"
          onClick={() => { addLanguage(); }}
        >
          <span className="fas fa-plus" />
        </button>
        )
      }
    </span>
  );
};
ContentLanguageBar.propTypes = {
  languages: PropTypes.array.isRequired,
  activeLanguage: PropTypes.number.isRequired,
  setLanguage: PropTypes.func.isRequired,
  add: PropTypes.bool,
  addLanguage: PropTypes.func,
};
ContentLanguageBar.defaultProps = {
  add: undefined,
  addLanguage: undefined,
};

export default ContentLanguageBar;
