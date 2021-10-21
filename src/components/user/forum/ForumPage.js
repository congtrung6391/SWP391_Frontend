import React from 'react';
import NavigationBar from '../../common/NavigationBar';
import Body, { Main, SideBar } from '../../basic/Body';
import QuestionList from './QuestionList';
import TopQuestionList from './TopQuestionList';

const ForumPage = (props) => {
  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Forum'],
        ]}
      />
      <Body>
        <Main>
          <QuestionList />
        </Main>
        <SideBar>
          <TopQuestionList />
        </SideBar>
      </Body>
    </>
  );
};

export default ForumPage;