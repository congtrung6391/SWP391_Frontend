import React from 'react';
import { LanguageContext } from '../../context/language.context';
import { SideBar } from '../basic/Body';
import LanguageService from '../../services/language.service';
import LeaderboardLanguage from './leaderboard.lang';
import UpcomingContestPanel from './UpcomingContestPanel';
import LeaderboardPanel from './LeaderboardPanel';
import NewestProblemPanel from './NewestProblemsPanel';

const LS = new LanguageService();
LS.import(LeaderboardLanguage);
const PageInfoSidebar = () => (
  <LanguageContext.Consumer>
    {({ language }) => {
      LS.use(language);

      return (
        <SideBar>
          <LeaderboardPanel limit={10} />
          <NewestProblemPanel />
          <UpcomingContestPanel />
        </SideBar>
      );
    }}
  </LanguageContext.Consumer>
);
export default PageInfoSidebar;
