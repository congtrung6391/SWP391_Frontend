import React from 'react';
import { LoadingDNA3X } from '../../common/Loading';
import PaginationList from '../../basic/PaginationList';
import URLService from '../../../services/URL.service';
import AdminUsersService from '../../../services/adminUsers.service';
import SingleUser from './SingleUser';
import UserTypeProvider from '../../../context/usertype.context';

class ListUsers extends PaginationList {
  constructor(props) {
    super(props);
    this.itemPerPage = 20;
    const { page, search } = URLService.getAllQueryString();

    this.state = {
      ...this.state,
      page: Number(page) || 1,
      fetched: false,
      search,
    };
  }

  render() {
    if (!this.state.fetched) {
      return <LoadingDNA3X />;
    }

    return (
      <UserTypeProvider>
        <div>
          <table className="basic-component-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Fullname</th>
                <th>Role</th>
                <th className="text-center">Change password</th>
                <th>Ban</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((user) => (
                  <SingleUser
                    key={`user${user.Id}`}
                    user={user}
                  />
                ))
              }
            </tbody>
          </table>
          <br />
          {
            this.renderPagination(this.refresh)
          }
        </div>
      </UserTypeProvider>
    );
  }

  componentDidMount() {
    this.onPageChange(this.state.page);
    this.fetchUsers();
  }

  // eslint-disable-next-line camelcase
  async UNSAFE_componentWillReceiveProps() {
    const { search } = URLService.getAllQueryString();
    if (search !== undefined && search !== this.state.search) {
      await this.setState({
        page: 1,
        search,
      });
      await this.refresh();
    }
  }

  refresh = async () => {
    this.setState({ fetched: false });
    URLService.setQueryString('page', this.state.page);
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const setting = URLService.getAllQueryString();
      setting.key = setting.search;
      const { users, totalUsers } = await AdminUsersService.getUsers(setting);
      this.setState({
        fetched: true,
        users,
        totalUsers,
        numberOfPage: Math.ceil(totalUsers / this.itemPerPage),
      });
      this.props.setTotalUsers(totalUsers);
    } catch (error) {
      this.setState({ fetched: true });
    }
  }
}

export default ListUsers;
