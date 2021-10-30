import React from 'react';
import NavigationBar from '../../common/NavigationBar';
import Body, { Main, SideBar } from '../../basic/Body';
import QuestionList from './QuestionList';
import TopQuestionList from './TopQuestionList';
import QuestionPage from './QuestionPage';

const ForumPage = (props) => {
  const { match } = props;
  const { qid } = match.params;

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Forum', '/forum'],
        ]}
      />
      <Body>
        <Main>
          {
            qid
              ? <QuestionPage qid={qid}  />
              : <QuestionList />
          }
        </Main>
        <SideBar>
          <TopQuestionList />
        </SideBar>
      </Body>
    </>
  );
};

export default ForumPage;