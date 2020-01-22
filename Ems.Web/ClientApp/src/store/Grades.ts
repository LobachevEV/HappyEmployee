const requestGradesType = "REQUEST_GRADES";
const receiveGradesType = "RECEIVE_GRADES";
const addGradeType = "ADD_GRADE";
const editGradeType = "EDIT_GRADE";
const removeGradeType = "REMOVE_GRADE";
const initialState = {items: [], isLoading: false};

export const actionCreators = {
  requestGrades: (startIndex?: number, rowsPerPage?: number) => async (dispatch: any, getState: any) => {    
    if (startIndex && startIndex === getState().grades.startIndex && rowsPerPage && rowsPerPage === getState().grades.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestGradesType, startIndex, rowsPerPage});
    const url = `api/Grades?startIndex=${startIndex || 0}&amount=${rowsPerPage || 0}`;
    const response = await fetch(url);
    const items = await response.json();

    dispatch({type: receiveGradesType, startIndex, rowsPerPage, items});
    return Promise.resolve();
  },

  addGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const items = getState().grades.items;
    items.push(items);
    dispatch({type: addGradeType, items});
  },
  editGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const items = getState().grades.items;
    items.push(items);
    dispatch({type: editGradeType, items});
  },
  removeGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const items = getState().grades.items;
    items.push(items);
    dispatch({type: removeGradeType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  if (action.type === requestGradesType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      isLoading: true
    };
  }

  if (action.type === receiveGradesType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      items: action.items,
      isLoading: false
    };
  }

  if (action.type === addGradeType) {
    return {
      ...state,
      items: action.items
    };
  }

  return state;
};
