import {IGrade} from "../Model/Api";

const requestGradesType = "REQUEST_GRADES";
const receiveGradesType = "RECEIVE_GRADES";
const addGradeType = "ADD_GRADE";
const removeGradeType = "REMOVE_GRADE";
const initialState = {items: [],total:0, isLoading: false};

export const actionCreators = {
  requestGrades: () => async (dispatch: any, getState: any) => {
    dispatch({type: requestGradesType,});
    const url = `api/Grades`;
    const response = await fetch(url);
    const {grades, total} = await response.json();

    dispatch({type: receiveGradesType, items:grades, total});
    return Promise.resolve();
  },

  saveGrade: (grade: IGrade) => async (dispatch: any, getState: any) => {    
    const url = `api/Save?type=Grade`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url,{method:"POST", body: JSON.stringify(grade), headers:headers});
    const result = await response.json();
    const items = getState().grades.items;
    items.push(result);
    dispatch({type: addGradeType, items});
  },
  removeGrade: (id: number) => async (dispatch: any, getState: any) => {
    const url = `api/Delete?type=Grade`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url,{method:"DELETE", body: JSON.stringify(id), headers:headers});
    const deletedId =  await response.json();
    const items = getState().grades.items.filter((grade:IGrade) => grade.id !== deletedId);
    dispatch({type: removeGradeType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case requestGradesType:
      return {
        ...state,
        isLoading: true
      };
    case receiveGradesType:
      return {
        ...state,
        items: action.items,
        total: action.total,
        isLoading: false
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
