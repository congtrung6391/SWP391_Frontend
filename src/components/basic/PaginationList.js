/* eslint-disable react/no-unused-state */
import React from 'react';
import Pagination from './Pagination';

class PaginationList extends React.Component {
  constructor(props, itemPerPage = 10) {
    super(props);
    this.itemPerPage = itemPerPage;
    this.state = {
      startIndex: 0,
      endIndex: this.itemPerPage,
      page: 1,
    };
  }

  renderPagination = (next) => {
    this.next = next;
    const { numberOfPage, page } = this.state;
    return (
      <Pagination
        onPageChange={this.onPageChange}
        numberOfPage={numberOfPage}
        init={page}
      />
    );
  }

  onPageChange = async (page) => {
    await this.setState(() => ({
      page,
      startIndex: (page - 1) * this.itemPerPage,
      endIndex: (page - 1) * this.itemPerPage + this.itemPerPage,
    }));
    try {
      if (this.next) await this.next();
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default PaginationList;
