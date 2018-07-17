import React, { Component } from 'react'

function getPager(totalItems, currentPage, pageSize) {
  currentPage = currentPage || 1;
  // default page size is 2
  pageSize = pageSize || 4;

  // calculate total pages
  var totalPages = Math.ceil(totalItems / pageSize);

  var startPage, endPage;
  if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
  } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
  }

  // calculate start and end item indexes
  var startIndex = (currentPage - 1) * pageSize;
  var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  var pages = [];
  for (let i = startPage; i < (endPage + 1); i++) {
    pages.push(i);
  }

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

class PostPagination extends Component {

  constructor(props) {
      super(props);
      this.state = {
        pager: {}
      };
      this.setPage = this.setPage.bind(this);

    }
    componentWillMount() {
      if (this.props.itemsLength) {
        this.setPage(this.props.initialPage);
      }
    }


    componentDidUpdate(prevProps, prevState) {
      // reset page if items array has changed
      if (this.props.itemsLength !== prevProps.itemsLength) {
        this.setPage(this.props.initialPage);
      }
    }

    setPage(page) {
      var itemsLength = this.props.itemsLength;


      var pager = this.state.pager;

      if (page < 1 || page > pager.totalPages) {
        return;
      }

      pager = getPager(itemsLength, page);

      var perPage = pager.pageSize;

      this.setState({ pager: pager });

      this.props.onChangePage(page, perPage);
    }



  render() {
    var pager = this.state.pager;
      if (!pager.pages || pager.pages.length <= 1) {
        // No need to display pagination is there is only 1 page to show.
        return null;
      }

    return (
      <div>
      <ul className="pagination">
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.setPage(1)}>First</a>
          </li>
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
          </li>
          {pager.pages.map((page, index) =>
            <li key={index} className={pager.currentPage === page ? 'active' : ''}>
              <a onClick={() => this.setPage(page)}>{page}</a>
            </li>
          )}
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
          </li>
          <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
            <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
          </li>
        </ul>
      </div>
    );
  }
}
PostPagination.defaultProps = {
  initialPage: 1,
  testPage: 20
};
PostPagination.propTypes = {
  initialPage: React.PropTypes.number,
  testPage: React.PropTypes.number
}

export default PostPagination;
