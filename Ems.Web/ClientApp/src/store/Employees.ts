import {IEmployee} from "../Model/Api";

const requestEmployeesType = "REQUEST_EMPLOYEES";
const receiveEmployeesType = "RECEIVE_EMPLOYEES";
const addEmployeeType = "ADD_EMPLOYEE";
const editEmployeeType = "EDIT_EMPLOYEE";
const removeEmployeeType = "REMOVE_EMPLOYEE";
const initialState = {items: [], total: 0, isLoading: false};

export const actionCreators = {
  requestEmployees: (startIndex: number, rowsPerPage: number) => async (dispatch: any, getState: any) => {
    if (startIndex === getState().employees.startIndex && rowsPerPage === getState().employees.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestEmployeesType, startIndex, rowsPerPage});
    const url = `api/Employees?startIndex=${startIndex}&amount=${rowsPerPage}`;
    const response = await fetch(url);
    const {employees, total} = await response.json();

    dispatch({type: receiveEmployeesType, startIndex, rowsPerPage, items:employees, total});
    return Promise.resolve();
  },

  addEmployee: (employee: IEmployee) => async (dispatch: any, getState: any) => {
    console.log("addEmployee");
    const url = `api/Employee`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});    
    const response = await fetch(url,{method:"POST", body: JSON.stringify(employee), headers:headers});
    const result = await response.json();
    const items = getState().employees.items;
    items.push(result);
    dispatch({type: addEmployeeType, items});
  },
  editEmployee: (employee: any) => async (dispatch: any, getState: any) => {
    const items = getState().employees.items;
    items.push(items);
    dispatch({type: editEmployeeType, items});
  },
  removeEmployee: (employee: any) => async (dispatch: any, getState: any) => {
    const items = getState().employees.items;
    items.push(items);
    dispatch({type: removeEmployeeType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  if (action.type === requestEmployeesType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      isLoading: true
    };
  }

  if (action.type === receiveEmployeesType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      items: action.items,
      total:action.total,
      isLoading: false
    };
  }

  if (action.type === addEmployeeType) {
    return {
      ...state,
      items: action.items
    };
  }

  return state;
};
