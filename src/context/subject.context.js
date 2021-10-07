/* eslint-disable react/no-unused-state */
import React from 'react';
import SubjectService from '../services/subject.service';

export const SubjectContext = React.createContext();

class SubjectProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      getSubjects: this.getSubjects,
    };
  }
  
  getSubjects = async () => {
    const { subjects } = this.state;
    if (subjects.length === 0) {
      const newSubjects = await SubjectService.getSubjects();
      this.setState({ subjects: newSubjects });
    }
  }

  componentDidMount() {
    this.getSubjects();
  }

  render() {
    const { children } = this.props;
    return (
      <SubjectContext.Provider value={this.state}>
        { children }
      </SubjectContext.Provider>
    );
  }
}

export default SubjectProvider;
