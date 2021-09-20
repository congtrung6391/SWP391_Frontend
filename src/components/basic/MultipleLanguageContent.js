/* eslint-disable react/no-unused-state */
import React from 'react';

class MultipleLanguageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 0,
    };
  }

  setLanguage = (newLanguage) => {
    this.setState({ language: newLanguage });
  }
}

export default MultipleLanguageContent;
