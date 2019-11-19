import React from 'react';
import { store } from './../redux/store.js';
import { NavLink, withRouter } from 'react-router-dom';

function generatePageLinks(pageCount) {
  const links = [];
  for (let i = 0; i < pageCount; i += 1) {
    const link = (
      <NavLink
        className="page-link"
        activeClassName="active-page-link"
        key={`page_${i}`}
        to={`/${i}`}
      >
        {i + 1}
      </NavLink>
    );
    links.push(link);
  }
  return links;
}

class PageNav extends React.Component {
  constructor() {
    super();
    this.state = { currentPage: 0, totalEmployees: 0, rowsPerPage: 0 };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const { currentPage, totalEmployees, rowsPerPage } = store.getState();
      this.setState({ currentPage, totalEmployees, rowsPerPage });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { totalEmployees, rowsPerPage, currentPage } = this.state;
    const totalPages = Math.ceil(totalEmployees / rowsPerPage);
    return (
      /* the PageNav component doesn't have acess to the pageNum param and I don't
        like parsing url strings so I decided to keep track of the current
        page in redux */
      <nav class="page-nav">
        <NavLink
          className="page-link"
          to={`/${currentPage === 0 ? 0 : currentPage - 1}`}
        >
          Prev
        </NavLink>
        {generatePageLinks(totalPages)}
        <NavLink
          className="page-link"
          to={`/${
            currentPage === totalPages - 1 ? currentPage : currentPage + 1
          }`}
        >
          Next
        </NavLink>
      </nav>
    );
  }
}

export default PageNav;
