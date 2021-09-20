import React from 'react';
import { LoadingDNA3X } from './Loading';
import LanguageService from '../../services/language.service';
import { LanguageContext } from '../../context/language.context';
import Panel from '../basic/Panel';
import PracticeLanguage from './practice.lang';
import ProblemService from '../../services/problem.service';

const LS = new LanguageService();
LS.import(PracticeLanguage);

class NewestProblemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      fetched: false,
    };
  }

  componentDidMount = async () => {
    const problems = await ProblemService.getNewestProblems();
    await this.setState(() => ({
      problems,
      fetched: true,
    }));
  }

  onClick = (event) => {
    const problemCode = event.target.id;
    window.location = (`/problems/${problemCode}/statement`);
  }

  render = () => {
    const { fetched, problems } = this.state;
    return (
      <LanguageContext.Consumer>
        {
        ({ language }) => {
          LS.use(language);

          if (!fetched) { return <LoadingDNA3X />; }

          return (
            <Panel title={LS.get('newProblem')}>
              <table className="basic-component-table bg-white table-inside">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>#</th>
                    <th style={{ textAlign: 'left' }}>{LS.get('name')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    problems && problems.map((problem, index) => (
                      <tr key={problem.ProblemCode} onClick={this.onClick} style={{ cursor: 'pointer' }}>
                        <td id={problem.ProblemCode}>{index + 1}</td>
                        <td style={{ textAlign: 'left', wordBreak: 'break-word' }} id={problem.ProblemCode}>
                          {problem.Vi.Name || problem.En.Name}
                        </td>
                      </tr>
                    ))
                  }
                  {
                    problems && problems.length === 0
                    && (
                    <tr className="no-effect">
                      <td colSpan={3} className="problemList-align-center"><em>{LS.get('noNewProblem')}</em></td>
                    </tr>
                    )
                  }
                </tbody>
              </table>
            </Panel>
          );
        }
      }
      </LanguageContext.Consumer>
    );
  }
}

export default NewestProblemPanel;
