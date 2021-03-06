import {IEmployee} from "../Model/Api";

const requestEmployeesType = "REQUEST_EMPLOYEES";
const receiveEmployeesType = "RECEIVE_EMPLOYEES";
const addEmployeeType = "ADD_EMPLOYEE";
const removeEmployeeType = "REMOVE_EMPLOYEE";
const initialState = {items: [], total: 0, isLoading: false};

export const actionCreators = {
  requestEmployees: () => async (dispatch: any, getState: any) => {
    dispatch({type: requestEmployeesType});
    const url = `api/Employees`;
    const response = await fetch(url);
    const {employees, total} = await response.json();

    dispatch({type: receiveEmployeesType, items: employees, total});
    return Promise.resolve();
  },

  saveEmployee: (employee: IEmployee) => async (dispatch: any, getState: any) => {
    const url = `api/Save?type=Employee`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url, {method: "POST", body: JSON.stringify(employee), headers: headers});
    const result = await response.json();
    const items = getState().employees.items;
    const updatedEmployeeIdx = items.findIndex((emp: IEmployee) => emp.id === result.id)
    if (updatedEmployeeIdx === -1)
      items.push(result);
    else
      items[updatedEmployeeIdx] = result;
    dispatch({type: addEmployeeType, items});
  },
  removeEmployee: (id: number) => async (dispatch: any, getState: any) => {
    const url = `api/Delete?type=Employee`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url, {method: "DELETE", body: JSON.stringify(id), headers: headers});
    const deletedId = await response.json();
    const items = getState().employees.items.filter((emp: IEmployee) => emp.id !== deletedId);
    dispatch({type: removeEmployeeType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case requestEmployeesType:
      return {
        ...state,
        isLoading: true
      };
    case receiveEmployeesType:
      return {
        ...state,
        items: action.items,
        total: action.total,
        isLoading: false
      };
    case addEmployeeType:
      return {
        ...state,
        items: action.items
      };
    case removeEmployeeType:
      return {
        ...state,
        items: action.items
      };
  }

  return state;
};
