/* eslint-disable react/no-unused-state */
import moment from 'moment';
import React from 'react';
import adminCourseTimetableService from '../services/AdminCourseTimetable.service';

export const PublicCourseTimetableContext = React.createContext();

class PublicCourseTimetableProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timetableList: [],
      getTimetableList: this.getTimetableList,
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

  getTimetableList = async (cid) => {
    let timetableList = await adminCourseTimetableService.getTimetableList(cid);
    timetableList = timetableList.sort((a, b) => new moment(a).subtract(new moment(b)));
    this.setState({ timetableList });
    return timetableList;
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <PublicCourseTimetableContext.Provider value={this.state}>
        { children }
      </PublicCourseTimetableContext.Provider>
    );
  }
}

export default PublicCourseTimetableProvider;
