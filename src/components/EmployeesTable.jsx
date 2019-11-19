import React from 'react';
import { store } from '../redux/store';
import {
  updatePageNumber,
  updateDisplayedEmployees,
  updateTotalEmployees,
} from '../redux/actions';

import EmployeeRow from './EmployeeRow';

function getEmployees(currentPage) {
  fetch(`/api/employees/${currentPage}`)
    .then(response => response.json())
    .then(data => {
      const { rows, count } = data;
      store.dispatch(updateDisplayedEmployees(rows));
      store.dispatch(updateTotalEmployees(count));
    })
    .catch(e => {
      console.error('error fetching employees', e);
    });
}
class EmployeesTable extends React.Component {
  constructor() {
    super();
    this.state = { displayedEmployees: [] };
    // refs are used to access DOM nodes directly.
    // they are empty until they are attached to a node
    // https://reactjs.org/docs/refs-and-the-dom.
    this.employeeTableBodyRef = React.createRef();
  }

  componentDidMount() {
    /* the EmployeesContainer and its pageNum param are the source of truth for currentPage
      which is why we always extract the currentPage from our 
      url params rather than retrieving it from the redux store 
      currentPage is used in the PageNav components prev and next links 
     */
    const currentPage = parseInt(this.props.match.params.pageNum) || 0;
    store.dispatch(updatePageNumber(currentPage));
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        displayedEmployees: store.getState().displayedEmployees,
      });
    });
    getEmployees(currentPage);
  }

  componentDidUpdate(prevProps) {
    const prevPage = parseInt(prevProps.match.params.pageNum) || 0;
    const currentPage = parseInt(this.props.match.params.pageNum) || 0;
    if (prevPage !== currentPage) {
      // get new employees from server on page change
      getEmployees(currentPage);
      // update the currentPage redux state
      store.dispatch(updatePageNumber(currentPage));
      // scroll to the top of the table every time you move to another page
      this.employeeTableBodyRef.current.scrollTo(0, 0);
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { displayedEmployees } = this.state;
    return (
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Title</th>
          </tr>
        </thead>
        {/* the ref created in the constructor gains access to the tbody node here*/}
        <tbody ref={this.employeeTableBodyRef}>
          {displayedEmployees.map((employee, idx) => (
            <EmployeeRow
              row={idx}
              key={employee.id}
              employeeDetails={employee}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default EmployeesTable;
