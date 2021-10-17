import React from 'react';
import Body, { Main, SideBar } from '../../basic/Body';
import NavigationBar from '../../common/NavigationBar';
import PublicCourseFilter from './PublicCourseFilter';
import PublicCourseList from './PublicCourseList';

const PublicCourse = (props) => {
  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Courses'],
        ]}
      />
      <Body>
        <SideBar>
          <PublicCourseFilter />
        </SideBar>
        <Main>
          <PublicCourseList />
        </Main>
      </Body>
    </>
  );
}

export default PublicCourse;