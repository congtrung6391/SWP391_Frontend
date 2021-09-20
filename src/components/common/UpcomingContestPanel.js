import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { LoadingDNA3X } from './Loading';
import SidePanelLanguage from './sidepanel.lang';
import LanguageService from '../../services/language.service';
import { ContestsContext } from '../../context/contests.context';
import { LanguageContext } from '../../context/language.context';
import Panel from '../basic/Panel';

const LS = new LanguageService();
LS.import(SidePanelLanguage);

class UpcomingContestPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
      contests: [],
      beforeContests: [],
    };
  }

  async componentDidMount() {
    try {
      await this.ContestsContext.startFetchContests();
      await this.setState(() => ({
        contests: this.ContestsContext.upcomingContests,
      }));
      const countTime = this.countTimeBeforeContest;

      this.interval = setInterval(() => {
        countTime();
      }, 1000);
      await this.setState(() => ({
        isFetched: true,
      }));
    } catch (error) {
      // console.log(error);
    }
  }

  countTimeBeforeContest = async () => {
    await this.setState(() => ({
      contests: this.ContestsContext.upcomingContests,
    }));
    await this.setState((prev) => ({
      beforeContests: prev.contests.map((contest) => {
        const diff = moment.duration(moment(parseInt(contest.StartTime, 10)).diff(moment()));
        if (Math.round(diff.asDays()) > 0) {
          return `${Math.round(diff.asDays())} ${LS.get('daysLabel')}`;
        }
        if (Math.round(diff.asHours()) > 0) {
          return `${Math.round(diff.asHours())} ${LS.get('hoursLabel')}`;
        }
        if (Math.round(diff.asMinutes()) > 0) {
          return `${Math.round(diff.asMinutes())} ${LS.get('minutesLabel')}`;
        }
        return `${Math.round(diff.asSeconds())} ${LS.get('secondsLabel')}`;
      }),
    }));
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const { isFetched, contests, beforeContests } = this.state;
    return (
      <LanguageContext.Consumer>
        {({ language }) => {
          LS.use(language);
          return (
            <ContestsContext.Consumer>
              {(context) => {
                this.ContestsContext = context;
                return (
                  <Panel title={LS.get('upcomingContestsTitle')}>
                    {!isFetched && <LoadingDNA3X />}
                    {isFetched
                    && (
                      <table
                        style={{ paddingBottom: '0', paddingTop: '0', margin: '0' }}
                        className="basic-component-table table table-striped"
                      >
                        <tbody>
                          {
                            contests && contests.length > 0
                            && contests.map((contest, index) => (
                              <tr className="upcoming-div-single-contest m1" key={contest.Id}>
                                <td className="problemList-align-center">
                                  <NavLink className="navlink-upcoming-contest" to={`/contest/${contest.Id}`}>
                                    {contest.Name}
                                  </NavLink>
                                  <br />
                                  <span style={{ fontSize: '13px', opacity: '0.6' }}>{beforeContests[index]}</span>
                                </td>
                              </tr>
                            ))
                          }
                          {
                            contests && contests.length === 0
                            && (
                              <tr className="no-effect">
                                <td className="problemList-align-center" colSpan={2}>
                                  <em>{LS.get('noUpComingContest')}</em>
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    )}
                  </Panel>
                );
              }}
            </ContestsContext.Consumer>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

// UpcomingContestPanel.contextType = ContestsContext;

export default UpcomingContestPanel;
