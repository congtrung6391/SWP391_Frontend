import React from 'react';
import { NavLink } from 'react-router-dom';
import { Loading } from './Loading';
import LanguageService from '../../services/language.service';
import LeaderboardService from '../../services/leaderboard.service';
import { history } from '../../App';
import LeaderboardLanguage from './leaderboard.lang';
import { LanguageContext } from '../../context/language.context';
import CollectionService from '../../services/collection.service';

const LS = new LanguageService();
LS.import(LeaderboardLanguage);

class MiniLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      totaluser: 0,
      startIndex: 0,
      endIndex: 20,
      leaderboard: [],
    };
  }

  async componentDidMount() {
    await this.fetchLeaderboard();
  }

  fetchLeaderboard = async () => {
    const { type, limit, collectionId } = this.props;
    let response;
    if (type === 'collection') {
      response = await CollectionService.getCollectionLeaderboard(collectionId);
    } else {
      response = await LeaderboardService.getLeaderboard();
    }
    let { leaderboard } = response;
    if (limit) {
      leaderboard = leaderboard.slice(0, limit);
    }
    this.setState(() => ({
      leaderboard,
      // totaluser: leaderboard.length,
      // fetched: true,
    }));
  }

  seeFull = () => {
    history.push('/leaderboard');
  }

  render() {
    const { leaderboard } = this.state;
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
                    <th style={{ width: '15%' }}>{LS.get('rating')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leaderboard.map((row, index) => (
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
                        <td style={{ textAlign: 'left' }}>
                          {row.Solved}
                        </td>
                      </tr>
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
            </div>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}
export default MiniLeaderboard;
