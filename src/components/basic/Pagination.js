import ReactPaginate from 'react-paginate';
import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handlePageClick = (info) => {
    const { onPageChange } = this.props;
    onPageChange(info.selected + 1);
  }

  render() {
    const { numberOfPage, init } = this.props;

    return (
      numberOfPage > 1
        ? (
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={(<span className="fas fa-chevron-circle-left" />)}
              nextLabel={(<span className="fas fa-chevron-circle-right" />)}
              breakLabel={(<span className="fas fa-ellipsis-h" />)}
              breakClassName="break-me"
              pageCount={numberOfPage}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              onPageChange={this.handlePageClick}
              containerClassName="pagination-basic"
              activeClassName="page-active-basic"
              pageClassName="page-basic"
              pageLinkClassName="page-link-basic"
              forcePage={init ? Number(init) - 1 : 0}
            />
          </div>
        ) : <></>
    );
  }
}
Pagination.propTypes = {
  numberOfPage: PropTypes.number.isRequired,
  init: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  init: undefined,
};

export default Pagination;
