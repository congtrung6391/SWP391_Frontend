import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PaginationList from '../../basic/PaginationList';
import Button from '../../basic/Button';

import SearchBar from '../SearchBar';
import { Loading3X } from '../Loading';

class PickedModeratorList extends PaginationList {
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
      numberOfPage: Math.ceil(this.getFilteredModerators().length / this.itemPerPage),
      fetched: true,
    });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { pattern } = props;
    const numberOfPage = Math.ceil(this.getFilteredModerators().length / this.itemPerPage);
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

  getFilteredModerators = () => {
    let { pattern } = this.state;
    pattern = pattern.toLowerCase();
    const users = this.props.modList.filter((u) => (
      pattern === ''
      || u.Username.toLowerCase().includes(pattern)
      || u.Email.toLowerCase().includes(pattern)
    ));
    return users;
  }

  setPage = async () => {
    await this.setSearchParam('page', this.state.page, 1);
  }

  onPatternChange = async (event) => {
    const pattern = event.target.value;
    await this.props.setSearchParam('pattern', pattern, 1);
    this.setState({ pattern });
    await this.setState({
      numberOfPage: Math.ceil(this.getFilteredModerators().length / this.itemPerPage),
    });
    this.onPageChange(1);
  }

  onInformationChange = (e) => {
    e.preventDefault();
  }

  render() {
    const { editable } = this.props;

    if (!this.state.fetched) {
      return <Loading3X />;
    }

    return (
      <div>
        <div className="d-flex my-2">
          <div className="flex-grow-1 mr-2">
            <SearchBar Id="Search-picked" onChange={this.onPatternChange} />
          </div>
          <div className="p-2 bg-green text-white corner text-center">
            <strong>
              Số lượng:
              { this.props.modList.length }
            </strong>
          </div>
        </div>
        <table className="basic-component-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {
              this.getFilteredModerators().map((user, index) => (
                index >= this.state.startIndex && index < this.state.endIndex && (
                  <tr key={user.Id}>
                    <td className="text-break">{ user.Username }</td>
                    <td className="text-break">{ user.Email }</td>
                    <td className="text-break">
                      <Form.Control
                        type="text"
                        as="select"
                        value={user.Role || 'view'}
                        autoComplete="off"
                        name="role"
                        onChange={(event) => this.props.onRoleChange(event, user.Id)}
                        disabled={!editable}
                      >
                        {
                          user.Role && user.Role === 'owner' && (
                            <option value="owner">Owner</option>
                          )
                        }
                        <option value="edit">Edit</option>
                        <option value="view">View</option>
                      </Form.Control>
                    </td>
                    <td className="text-break">
                      <Button
                        className="bg-light-pink"
                        onClick={() => this.props.remove(user.Id)}
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
      </div>
    );
  }
}

PickedModeratorList.propTypes = {
  editable: PropTypes.bool,
};
PickedModeratorList.defaultProps = {
  editable: true,
};

export default PickedModeratorList;
