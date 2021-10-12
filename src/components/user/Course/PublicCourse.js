import { Grid } from '@mui/material';
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
        <Main>
          <PublicCourseList />
        </Main>
        <SideBar>
          <PublicCourseFilter />
        </SideBar>
      </Body>
    </>
  );
}

export default PublicCourse;