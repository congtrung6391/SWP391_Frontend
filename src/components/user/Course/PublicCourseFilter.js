import React, { useContext } from 'react';
import { CourseContext } from '../../../context/course.context';


const PublicCourseFilter = (props) => {
  const courseContext = useContext(CourseContext);

  return (
    <div>course list</div>
  );
}

export default PublicCourseFilter;
