/* eslint-disable react/no-unused-state */
import moment from 'moment';
import React from 'react';
import AdminCourseTimetableService from '../services/adminCourseTimetable.service';

export const AdminCourseTimetableContext = React.createContext();

class AdminCourseTimetableProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timetableList: [],
      getTimetableList: this.getTimetableList,
      addTimetable: this.addTimetable,
      updateTimetable: this.updateTimetable,
      deleteTimetable: this.deleteTimetable,
      dayInWeek: [
        { id: 2, name: 'Monday' },
        { id: 3, name: 'Tuesday' },
        { id: 4, name: 'Webnesday' },
        { id: 5, name: 'Thurday' },
        { id: 6, name: 'Friday' },
        { id: 7, name: 'Saturday' },
        { id: 1, name: 'Sunday' },
      ]
    };
  }

  getTimetableList = async (cid, setting = {}) => {
    let timetableList = await AdminCourseTimetableService.getTimetableList(cid, setting);
    timetableList = timetableList.sort((a, b) => new moment(a).subtract(new moment(b)));
    this.setState({ timetableList });
    return timetableList;
  }

  addTimetable = async (cid, data) => {
    const response = await AdminCourseTimetableService.addTimetable(cid, data);
    const { timetableList } = this.state;
    if (typeof response !== 'string') {
      timetableList.push(response);
      this.setState({ timetableList });
    }
    return response;
  }

  updateTimetable = async (cid, tid, data) => {
    const response = await AdminCourseTimetableService.updateTimetable(cid, tid, data);
    return response;
  }

  deleteTimetable = async (cid, tid) => {
    const response = await AdminCourseTimetableService.deleteTimetable(cid, tid);
    return response;
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <AdminCourseTimetableContext.Provider value={this.state}>
        { children }
      </AdminCourseTimetableContext.Provider>
    );
  }
}

export default AdminCourseTimetableProvider;
