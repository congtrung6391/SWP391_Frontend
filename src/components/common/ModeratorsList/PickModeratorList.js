import React from 'react';

import URLService from '../../../services/URL.service';
import { AdminUsersContext } from '../../../context/adminUsers.context';

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

  render() {
    return (
      <AdminUsersContext.Consumer>
        {(context) => {
          this.userContext = context;

          if (!this.state.fetched) {
            return <Loading3X />;
          }

          let filter = [];
          if (this.props.modList) {
            filter = this.props.modList.map((u) => u.UserId);
          }

          return (
            <>
              <div className="my-2">
                <SearchBar Id="Search-pick" toggleQuery searchKey="key" />
              </div>
              <table className="basic-component-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Thêm</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.userContext.users.filter((u) => u.Role !== 'User').map((user) => (
                      <tr key={user.Id}>
                        <td className="text-break">{ user.Username }</td>
                        <td className="text-break">{ user.Email }</td>
                        <td>
                          {
                            !filter.includes(user.Id)
                            && (
                              <Button
                                className="bg-green"
                                onClick={() => this.props.add(user)}
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
              {
                this.renderPagination(this.refresh)
              }
            </>
          );
        }}
      </AdminUsersContext.Consumer>
    );
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
    await this.fetchUsers(true);
  }

  fetchUsers = async (force = false) => {
    await this.userContext.fetchUsers(force);
    this.setState({
      numberOfPage: Math.ceil(this.userContext.totalUsers / 20),
      fetched: true,
    });
  }

  async componentDidMount() {
    this.onPageChange(this.state.page);
    await this.fetchUsers(true);
  }
}

export default PickModeratorList;
