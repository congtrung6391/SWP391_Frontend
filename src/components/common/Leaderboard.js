import React from 'react';
import { NavLink } from 'react-router-dom';
import { Loading } from './Loading';
import LanguageService from '../../services/language.service';
import LeaderboardService from '../../services/leaderboard.service';
import Pagination from '../basic/Pagination';
import { history } from '../../App';
import LeaderboardLanguage from './leaderboard.lang';
import { LanguageContext } from '../../context/language.context';
import CollectionService from '../../services/collection.service';

const LS = new LanguageService();
LS.import(LeaderboardLanguage);

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // fetched: false,
      leaderboard: [],
      totaluser: 0,
      startIndex: 0,
      endIndex: 20,
    };
  }

  async componentDidMount() {
    await this.fetchLeaderboard();
  }

  fetchLeaderboard = async () => {
    let response;
    const {
      type, collectionId, courseCode, lectureCode, limit,
    } = this.props;
    if (type === 'collection') {
      response = await CollectionService.getCollectionLeaderboard(collectionId);
    } else if (type === 'course') {
      response = await LeaderboardService.getCourseLeaderboard(courseCode);
    } else if (type === 'lecture') {
      response = await LeaderboardService.getLectureLeaderboard(lectureCode);
    } else {
      response = await LeaderboardService.getLeaderboard();
    }

    let leaderboard;
    if (response.leaderboard) leaderboard = response.leaderboard;
    else leaderboard = response;
    if (!leaderboard) return;
    if (limit) {
      leaderboard = leaderboard.slice(0, limit);
    }
    this.setState(() => ({
      leaderboard,
      totaluser: leaderboard.length,
      // fetched: true,
    }));
  }

  seeFull = () => {
    const url = window.location.pathname;
    if (url.includes('courses') || url.includes('problem')) {
      history.push(`${url.slice(0, url.lastIndexOf('/'))}/leaderboard`);
    }
    history.push('/leaderboard');
  }

  onPageChange = (page) => {
    let { startIndex, endIndex } = this.state;
    startIndex = (page - 1) * 20;
    endIndex = startIndex + 20;
    this.setState(() => ({
      startIndex,
      endIndex,
    }));
  }

  render() {
    const {
      leaderboard, startIndex, endIndex, totaluser,
    } = this.state;
    const { limit } = this.props;
    console.log(this.props);
    return (
      <LanguageContext.Consumer>
        {({ language }) => {
          LS.use(language);
          if (!leaderboard) {
            return <Loading />;
          }
          return (
            <div>
              <table className="basic-component-table bg-white table-inside">
                <thead>
                  <tr key="header">
                    <th style={{ width: limit ? '10%' : '10%', textAlign: 'center' }}>#</th>
                    <th style={{ textAlign: 'left' }}>{LS.get('who')}</th>
                    <th style={{ width: '15%', textAlign: 'right' }}>{LS.get('rating')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leaderboard
                    && leaderboard.map((row, index) => (
                      startIndex <= index && index < endIndex
                      && (
                        <tr id={index} key={row.Id}>
                          <td style={{ textAlign: 'center' }}>
                            {
                              index === 0
                              && <span className="fas fa-crown" style={{ color: '#FFD700' }} />
                            }
                            {
                              index === 1
                              && <span className="fas fa-crown" style={{ color: '#C0C0C0' }} />
                            }
                            {
                              index === 2
                              && <span className="fas fa-crown" style={{ color: '#CD8C32' }} />
                            }
                            {
                              index > 2
                              && `${index + 1}`
                            }
                          </td>
                          <td style={{ textAlign: 'left' }}>
                            <NavLink to={`/user/${row.Username}`}>
                              {row.Username}
                            </NavLink>
                          </td>
                          <td style={{ textAlign: 'right' }}>{row.Solved}</td>
                        </tr>
                      )
                    ))
                  }
                  {
                    leaderboard && limit
                    && (
                      <tr style={{ cursor: 'pointer' }} onClick={this.seeFull}>
                        <td colSpan={3} className="problemList-align-center">
                          <em>{LS.get('seeAll')}</em>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              {
                !limit
                && (
                  <Pagination
                    onPageChange={this.onPageChange}
                    numberOfPage={Math.ceil(totaluser / 20)}
                  />
                )
              }
            </div>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}
export default Leaderboard;
