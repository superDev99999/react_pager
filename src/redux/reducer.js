import {
  UPDATE_DISPLAYED_EMPLOYEES,
  UPDATE_PAGE_NUMBER,
  UPDATE_TOTAL_EMPLOYEES,
} from './constants';

const intialState = {
  currentPage: 0,
  displayedEmployees: [],
  totalEmployees: 0,
  // rowsPerPage is hardcoded for now
  // but could be made dynamic if you wanted to adjust how many results are displayed
  rowsPerPage: 50,
};

export const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_DISPLAYED_EMPLOYEES:
      return { ...state, displayedEmployees: action.payload };
    case UPDATE_PAGE_NUMBER:
      return { ...state, currentPage: action.payload };
    case UPDATE_TOTAL_EMPLOYEES:
      return { ...state, totalEmployees: action.payload };
    default:
      return state;
  }
};
