/* eslint-disable react/no-unused-state */
import React from 'react';
import LocalStorageService from '../services/localStorage.service';

export const LanguageContext = React.createContext();

export class LanguageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'vi',
      setLanguage: this.setLanguage,
    };
  }

  setLanguage = async (newLanguage) => {
    // await this.setState(() => ({
    //   language: newLanguage,
    // }));
    LocalStorageService.write('user-language', newLanguage);
  }

  render() {
    const { children } = this.props;
    return (
      <LanguageContext.Provider value={this.state}>
        {
          children
        }
      </LanguageContext.Provider>
    );
  }
}
