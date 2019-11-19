import {
  UPDATE_DISPLAYED_EMPLOYEES,
  UPDATE_TOTAL_EMPLOYEES,
  UPDATE_PAGE_NUMBER,
} from './constants';

export const updateDisplayedEmployees = employees => ({
  type: UPDATE_DISPLAYED_EMPLOYEES,
  payload: employees,
});

export const updateTotalEmployees = totalEmployees => ({
  type: UPDATE_TOTAL_EMPLOYEES,
  payload: totalEmployees,
});

export const updatePageNumber = page => ({
  type: UPDATE_PAGE_NUMBER,
  payload: page,
});
