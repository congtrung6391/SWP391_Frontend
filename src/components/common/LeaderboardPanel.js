import React from 'react';
import Leaderboard from './Leaderboard';
import Panel from '../basic/Panel';

const LeaderboardPanel = (props) => {
  let newLimit;
  let newTitle;
  const { title, limit } = props;
  if (limit) { newLimit = limit; }

  if (!title) { newTitle = 'Top 10'; } else { newTitle = title; }
  return (
    <Panel title={newTitle}>
      <Leaderboard limit={newLimit} {...props} />
    </Panel>
  );
};

export default LeaderboardPanel;
