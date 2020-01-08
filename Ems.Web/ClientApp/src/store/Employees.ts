const requestEmployeesType = "REQUEST_EMPLOYEES";
const receiveEmployeesType = "RECEIVE_EMPLOYEES";
const addEmployeeType = "ADD_EMPLOYEE";
const editEmployeeType = "EDIT_EMPLOYEE";
const removeEmployeeType = "REMOVE_EMPLOYEE";
const initialState = {employees: [], isLoading: false};

export const actionCreators = {
  requestEmployees: (startIndex: number, rowsPerPage: number) => async (dispatch: any, getState: any) => {
    if (startIndex === getState().employees.startIndex && rowsPerPage === getState().employees.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestEmployeesType, startIndex, rowsPerPage});
    const url = `api/Main/Employees?startIndex=${startIndex}&amount=${rowsPerPage}`;
    const response = await fetch(url);
    const employees = await response.json();

    dispatch({type: receiveEmployeesType, startIndex, rowsPerPage, employees});
    return Promise.resolve();
  },

  addEmployee: (employee: any) => async (dispatch: any, getState: any) => {
    const employees = getState().employees.employees;
    employees.push(employees);
    dispatch({type: addEmployeeType, employees});
  },
  editEmployee: (employee: any) => async (dispatch: any, getState: any) => {
    const employees = getState().employees.employees;
    employees.push(employees);
    dispatch({type: editEmployeeType, employees});
  },
  removeEmployee: (employee: any) => async (dispatch: any, getState: any) => {
    const employees = getState().employees.employees;
    employees.push(employees);
    dispatch({type: removeEmployeeType, employees});
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
      employees: action.employees,
      isLoading: false
    };
  }

  if (action.type === addEmployeeType) {
    return {
      ...state,
      employees: action.employees
    };
  }

  return state;
};
