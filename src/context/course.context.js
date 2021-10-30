/* eslint-disable react/no-unused-state */
import { touchRippleClasses } from '@mui/material';
import React from 'react';
import AdminCourseService from '../services/adminCourse.service';
import CourseService from '../services/course.service';

export const CourseContext = React.createContext();

class CourseProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      totalCouse: 0,
      course: {},
      limit: 6,
      getCourseList: this.getCourseList,
      getCourse: this.getCourse,
      register: this.register,
    };
  }

  getCourseList = async (setting) => {
    const response = await CourseService.getCourseList({ ...setting, limit: this.state.limit });
    console.log(response);
    if (typeof response === 'string') {
        return;
    } else {
        this.setState({ courseList: response.courseList, totalCourse: response.totalCourse });
    }
  }

  getCourse = async (id, auth = false) => {
    let newCourse = null;
    if (auth) {
      newCourse = await AdminCourseService.getCourse(id);
    } else {
      newCourse = await CourseService.getCourse(id);
    }
    if (typeof newCourse === 'string') {
      return null;
    }

    this.setState({ course: newCourse });
    return newCourse;
  }

  register = async (courseId) => {
    const response = await CourseService.registerCourse(courseId);
    if (typeof response === 'string') {
      return response;
    }

    const { courseList } = this.state;
    const index = courseList.findIndex((c) => c.id === courseId);
    courseList.splice(index, 1);
    this.setState({ courseList });
    return response;
  }

  componentDidMount() {
    this.getCourseList({});
  }

  render() {
    const { children } = this.props;
    return (
      <CourseContext.Provider value={this.state}>
        { children }
      </CourseContext.Provider>
    );
  }
}

export default CourseProvider;
