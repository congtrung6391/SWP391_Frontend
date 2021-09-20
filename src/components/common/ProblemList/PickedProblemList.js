import React from 'react';
import { Link } from 'react-router-dom';
// import FormControl from 'react-bootstrap/FormControl';
import PaginationList from '../../basic/PaginationList';
import { Loading3X } from '../Loading';
import Button from '../../basic/Button';
import { AdminProblemsContext } from '../../../context/adminProblems.context';
import SearchBar from '../SearchBar';

class PickedList extends PaginationList {
  constructor(props) {
    super(props, 20);
    this.state = {
      ...this.state,
      pattern: props.pattern,
      fetched: false,
    };
  }

  async componentDidMount() {
    this.setState({
      page: 1,
      numberOfPage: Math.ceil(this.getFilteredProblem().length / this.itemPerPage),
      fetched: true,
    });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { pattern } = props;
    const numberOfPage = Math.ceil(this.getFilteredProblem().length / this.itemPerPage);
    let { page } = this.state;
    if (page > numberOfPage && page > 1) {
      page -= 1;
      this.onPageChange(page);
    }
    this.setState({
      pattern,
      numberOfPage,
    });
  }

  getFilteredProblem = () => {
    let { pattern } = this.state;
    pattern = pattern.toLowerCase();
    const problems = this.props.problemList.filter((p) => (
      pattern === '' || p.ProblemCode.toLowerCase().includes(pattern)
        || p.ProblemName.toLowerCase().includes(pattern)
    )).sort((a, b) => Number(a.Rank) - Number(b.Rank));
    return problems;
  }

  setPage = async () => {
    await this.setSearchParam('page', this.state.page, 1);
  }

  onPatternChange = async (event) => {
    const pattern = event.target.value;
    await this.props.setSearchParam('pattern', pattern, 1);
    this.setState({ pattern });
    await this.setState({
      numberOfPage: Math.ceil(this.getFilteredProblem().length / this.itemPerPage),
    });
    this.onPageChange(1);
  }

  // onChangeOrder = (a, b) => {
  //   let u = Number(a);
  //   let v = Number(b);
  //   const problems = this.props.problemList;
  //   u = problems.find((p) => p.Rank === u);
  //   v = problems.find((p) => p.Rank === v);
  //   const t = u.Rank;
  //   u.Rank = v.Rank;
  //   v.Rank = t;
  //   this.props.remove(-1);
  // }

  render() {
    return (
      <AdminProblemsContext.Consumer>
        {(context) => {
          this.problemContext = context;

          if (!this.state.fetched) {
            return <Loading3X />;
          }

          return (
            <>
              <div className="my-2">
                <SearchBar Id="search-picked-problem" searchKey="pattern" urlSetting={false} onChange={this.onPatternChange} />
              </div>
              <table className="basic-component-table">
                <thead>
                  <tr>
                    <th>Mã bài</th>
                    <th>Tên bài</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.getFilteredProblem().map((problem, index) => (
                      index >= this.state.startIndex && index < this.state.endIndex && (
                      <tr key={problem.Id}>
                        {/* <td style={{ width: '15%' }}>
                          <FormControl
                            as="select"
                            style={{ fontSize: '14px' }}
                            value={problem.Rank}
                            onChange={
                              (event) => this.onChangeOrder(problem.Rank, event.target.value)
                            }
                          >
                            {
                              Array.from(Array(this.props.lecture.Problems.length)
                                .keys())
                                .map((e) => (
                                  <option value={e + 1} key={e}>
                                    {String.fromCharCode(e + 65)}
                                  </option>
                                ))
                            }
                          </FormControl>
                        </td> */}
                        <td className="text-break">
                          <Link to={`/admin/problems/${problem.Id}`}>{problem.ProblemCode}</Link>
                        </td>
                        <td className="text-break">
                          <Link to={`/admin/problems/${problem.Id}`}>{problem.ProblemName}</Link>
                        </td>
                        <td>
                          <Button
                            className="bg-light-pink"
                            onClick={() => this.props.remove(problem.Id)}
                          >
                            <span className="fas fa-trash" />
                          </Button>
                        </td>
                      </tr>
                      )
                    ))
                  }
                </tbody>
              </table>
              {
              this.renderPagination(this.setPage)
            }
            </>
          );
        }}
      </AdminProblemsContext.Consumer>
    );
  }
}

export default PickedList;
