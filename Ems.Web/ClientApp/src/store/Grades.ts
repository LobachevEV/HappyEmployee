import {IEmployee, IGrade} from "../Model/Api";

const requestGradesType = "REQUEST_GRADES";
const receiveGradesType = "RECEIVE_GRADES";
const addGradeType = "ADD_GRADE";
const removeGradeType = "REMOVE_GRADE";
const initialState = {items: [], total: 0, isLoading: false};

export const actionCreators = {
  requestGrades: () => async (dispatch: any, getState: any) => {
    dispatch({type: requestGradesType, isLoading: false});
    const url = `api/Grades`;
    const response = await fetch(url);
    const {grades, total} = await response.json();

    dispatch({type: receiveGradesType, items: grades, total, isLoading: false});
  },

  saveGrade: (grade: IGrade) => async (dispatch: any, getState: any) => {
    const url = `api/Save?type=Grade`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url, {method: "POST", body: JSON.stringify(grade), headers: headers});
    const result = await response.json();
    const items = getState().grades.items;
    const updatedGradeIdx = items.findIndex((emp: IEmployee) => emp.id === grade.id)
    if (updatedGradeIdx === -1)
      items.push(result);
    else
      items[updatedGradeIdx] = result;
    dispatch({type: addGradeType, items});
  },
  removeGrade: (id: number) => async (dispatch: any, getState: any) => {
    const url = `api/Delete?type=Grade`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url, {method: "DELETE", body: JSON.stringify(id), headers: headers});
    const deletedId = await response.json();
    const items = getState().grades.items.filter((grade: IGrade) => grade.id !== deletedId);
    dispatch({type: removeGradeType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case receiveGradesType:
      return {
        ...state,
        items: action.items,
        total: action.total,
        isLoading: action.isLoading
      };
    case addGradeType:
      return {
        ...state,
        items: action.items
      };
    case removeGradeType:
      return {
        ...state,
        items: action.items
      };
  }

  return state;
};
