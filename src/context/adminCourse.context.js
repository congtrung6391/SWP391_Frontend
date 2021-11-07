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
      limit: 3,
      course: {},
      getCourseList: this.getCourseList,
      getCourse: this.getCourse,
      updateCourse: this.updateCourse,
      deleteCourse: this.deleteCourse,
      createCourse: this.createCourse,
      publicCourse: this.publicCourse,
      replyRegister: this.replyRegister,
    };
  }

  getCourseList = async (setting) => {
    const { limit } = this.state;
    const response = await AdminCourseService.getCourseList({ ...setting, limit });
    if (typeof response === 'string') {
        return response;
    } else {
        this.setState({ courseList: response.courseList, totalCourse: response.totalCourse });
        return response;
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
    return newCourse;
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

  publicCourse = async (id, value) => {
    const response = await AdminCourseService.togglePublicCourse(id, { course_status: value });
    if (typeof response === 'string') {
      return response;
    }
    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === id);
    const course = courseList.find((c) => c.id === id);
    course.publicStatus = !course.publicStatus;
    courseList.splice(index, 1, course);
    this.setState({ courseList });
    return null;
  }

  replyRegister = async (id, action, course) => {
    const response = await AdminCourseService.replyCourseRegister(id, action);
    if (typeof response === 'string') {
      return response;
    }
    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === id);
    if (!action) {
      delete course.student;
    } else {
      course.courseStatus = false;
    }
    courseList.splice(index, 1, course);
    this.setState({ courseList });
    return null;
  }

  updateCourse = async (course) => {
    const { course: origin } = this.state;
    const packData = {};
    Object.keys(course).forEach((key) => {
      if (course[key] !== origin[key]) {
        packData[key] = course[key];
      }
    });
    const response = await AdminCourseService.updateCourse(course.id, packData);
    if (typeof response === 'string') {
      return response;
    }
    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === course.id);
    courseList.splice(index, 1, response);
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
