import {IEmployee} from "../Model/Api";

const requestEmployeesType = "REQUEST_EMPLOYEES";
const receiveEmployeesType = "RECEIVE_EMPLOYEES";
const addEmployeeType = "ADD_EMPLOYEE";
const editEmployeeType = "EDIT_EMPLOYEE";
const removeEmployeeType = "REMOVE_EMPLOYEE";
const initialState = {items: [], total: 0, isLoading: false};

export const actionCreators = {
  requestEmployees: () => async (dispatch: any, getState: any) => {
    dispatch({type: requestEmployeesType});
    const url = `api/Employees`;
    const response = await fetch(url);
    const {employees, total} = await response.json();

    dispatch({type: receiveEmployeesType, items:employees, total});
    return Promise.resolve();
  },

  saveEmployee: (employee: IEmployee) => async (dispatch: any, getState: any) => {    
    const url = `api/Save?type=Employee`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});    
    const response = await fetch(url,{method:"POST", body: JSON.stringify(employee), headers:headers});
    const result = await response.json();
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
      isLoading: true
    };
  }

  if (action.type === receiveEmployeesType) {
    return {
      ...state,      
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
