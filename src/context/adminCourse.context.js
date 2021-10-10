/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminCourseService from '../services/adminCourse.service';

export const AdminCourseContext = React.createContext();

class AdminCourseProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      totalCouse: 0,
      course: {},
      getCourseList: this.getCourseList,
      getCourse: this.getCourse,
      updateCourse: this.updateCourse,
      deleteCourse: this.deleteCourse,
      createCourse: this.createCourse,
    };
  }

  getCourseList = async (name, page, limit) => {
    const response = await AdminCourseService.getCourseList(name, page, limit);
    if (typeof response === 'string') {
        return;
    } else {
        this.setState({ courseList: response.courseList, totalCourse: response.totalCourse });
    }
  }

  getCourse = async (id) => {
    const { courseList } = this.state;
    const course = courseList.find((c) => c.id === id);
    
    if (course) {
      this.setState({ course });
      return course;
    }

    const newCourse = await AdminCourseService.getCourse(id);
    if (typeof newCourse === 'string') {
      return {};
    }
    courseList.push(newCourse);
    this.setState({ courseList, course: newCourse });
    return course;
  }

  createCourse = async (info) => {
    const newCourse = await AdminCourseService.createCourse(info);
    if (typeof newCourse === 'string') {
        return newCourse;
    }
    const { courseList } = this.state;
    courseList.push(newCourse);
    this.setState({ courseList });
    return newCourse;
  }

  deleteCourse = async (id) => {
    const response = await AdminCourseService.deleteCourse(id);
    if (typeof response === 'string') {
      return response;
    }
    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === id);
    courseList.splice(index, 1);
    this.setState({ courseList });
  }

  componentDidMount() {
    this.getCourseList();
  }

  render() {
    const { children } = this.props;
    return (
      <AdminCourseContext.Provider value={this.state}>
        { children }
      </AdminCourseContext.Provider>
    );
  }
}

export default AdminCourseProvider;
