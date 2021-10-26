import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ForumPage from '../../components/user/forum/ForumPage';
import QuestionPage from '../../components/user/forum/QuestionPage';
import ForumProvider from '../../context/forum.context';

const ForumRoute = () => {
  return (
    <ForumProvider>
      <Switch>
        <Route exact path="/forum/question/:qid" component={ForumPage} />
        <Route exact path="/forum" component={ForumPage} />
      </Switch>
    </ForumProvider>
  );
};

export default ForumRoute;
