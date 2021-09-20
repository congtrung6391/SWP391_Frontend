import React from 'react';
import { Link } from 'react-router-dom';
import URLService from '../../../services/URL.service';
import { AdminProblemsContext } from '../../../context/adminProblems.context';

import PaginationList from '../../basic/PaginationList';
import Button from '../../basic/Button';

import SearchBar from '../SearchBar';
import { Loading3X } from '../Loading';

class PickModeratorList extends PaginationList {
  constructor(props) {
    super(props, 20);
    const { page, key } = URLService.getAllQueryString();

    this.state = {
      endIndex: 20,
      ...this.state,
      page: Number(page) || 1,
      fetched: false,
      key,
    };
  }

  // eslint-disable-next-line camelcase
  async UNSAFE_componentWillReceiveProps() {
    const { key, tag } = URLService.getAllQueryString();
    if (key !== undefined && key !== this.state.key) {
      this.onPageChange(1);
      this.setState({
        page: 1,
        key,
        tag,
      });
      this.refresh();
    }
  }

  refresh = async () => {
    await this.setState({ fetched: false });
    URLService.setQueryString('page', this.state.page);
    await this.fetchProblems(true);
    await this.setState({ fetched: true });
  }

  fetchProblems = async (force = true) => {
    const setting = URLService.getAllQueryString();
    await this.AdminProblemsContext.fetchProblems(setting, force, this.props.onlyPublish);
    this.setState({
      numberOfPage: Math.ceil(this.AdminProblemsContext.totalProblems / 20),
      fetched: true,
    });
  }

  async componentDidMount() {
    this.onPageChange(this.state.page);
    await this.fetchProblems(true);
  }

  render() {
    return (
      <AdminProblemsContext.Consumer>
        {(context) => {
          this.AdminProblemsContext = context;

          let filter = [];
          if (this.props.problemList) {
            filter = this.props.problemList.map((u) => u.ProblemId);
          }

          return (
            <>
              <div className="my-2">
                <SearchBar Id="search-pick-problem" toggleQuery searchKey="search" />
              </div>
              <table className="basic-component-table">
                <thead>
                  <tr>
                    <th>Mã bài</th>
                    <th>Tên bài</th>
                    <th>Thêm</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    !this.state.fetched && (
                      <tr>
                        <td colSpan={3}>
                          <Loading3X />
                        </td>
                      </tr>
                    )
                  }
                  {
                    this.state.fetched && this.AdminProblemsContext.problems.map((problem) => (
                      <tr key={problem.Id}>
                        <td className="text-break">
                          <Link to={`/admin/problems/${problem.Id}`}>{problem.ProblemCode}</Link>
                        </td>
                        <td className="text-break">
                          <Link to={`/admin/problems/${problem.Id}`}>{problem.Name}</Link>
                        </td>
                        <td>
                          {
                            !filter.includes(problem.Id)
                            && (
                              <Button
                                className="bg-green"
                                onClick={() => this.props.add(problem)}
                              >
                                <span className="fas fa-plus-circle" />
                              </Button>
                            )
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <br />
              {
                this.renderPagination(this.refresh)
              }
            </>
          );
        }}
      </AdminProblemsContext.Consumer>
    );
  }
}

export default PickModeratorList;
