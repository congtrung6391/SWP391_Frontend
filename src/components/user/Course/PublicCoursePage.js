import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../../context/course.context';
import Body, { Main, SideBar } from '../../basic/Body';
import Page404 from '../../common/404';
import { LoadingPage } from '../../common/Loading';
import NavigationBar from '../../common/NavigationBar';

const PublicCoursePage = (props) => {
  const courseContext = useContext(CourseContext);
  const [fetched, setFetched] = useState(false); 
  const [course, setCourse] = useState({});
  
  useEffect(() => {
    const fetchCourse = async () => {
      setFetched(false);
      console.log(props);
      const id = props.match.params['cid'];
      const newCourse = await courseContext.getCourse(id);
      setCourse(newCourse);
      setFetched(true);
    }
    fetchCourse();
  },  [])

  if (!fetched) return <LoadingPage />

  if (!course) return <Page404 />

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Courses', '/courses'],
          ['Single'],
        ]}
      />
      <Body>
        <SideBar>
          
        </SideBar>
        <Main>

        </Main>
      </Body>
    </>
  );
}

export default PublicCoursePage;