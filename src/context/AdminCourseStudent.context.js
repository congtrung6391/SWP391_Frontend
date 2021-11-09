/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminCourseStudentService from '../services/adminCourseStudent.service';

export const AdminCourseStudentContext = React.createContext();

class AdminCourseStudentProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      totalStudent: 0,
      limit: 10,
      getStudentList: this.getStudentList,
      replyRegister: this.replyRegister,
    };
  }

  getStudentList = async (cid, setting = {}) => {
    const response = await AdminCourseStudentService.getStudentList(cid, setting);
    this.setState({
      studentList: response.studentList,
      totalStudent: response.totalStudent,
    })
    return response;
  }

  replyRegister = async (id, sid, action) => {
    const response = await AdminCourseStudentService.replyCourseRegister(id, sid, action);
    if (typeof response === 'string') {
      return response;
    }

    const { studentList } = this.state;
    const index = studentList.findIndex((s) => s.id === sid);
    if (!action) {
      studentList.splice(index, 1);
    } else {
      studentList[index].learningStatus = true;
    }
    this.setState({ studentList });
    return null;
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <AdminCourseStudentContext.Provider value={this.state}>
        { children }
      </AdminCourseStudentContext.Provider>
    );
  }
}

export default AdminCourseStudentProvider;
