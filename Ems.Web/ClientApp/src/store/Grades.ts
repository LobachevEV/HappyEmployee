const requestGradesType = "REQUEST_GRADES";
const receiveGradesType = "RECEIVE_GRADES";
const addGradeType = "ADD_GRADE";
const editGradeType = "EDIT_GRADE";
const removeGradeType = "REMOVE_GRADE";
const initialState = {grades: [], isLoading: false};

export const actionCreators = {
  requestGrades: (startIndex: number, rowsPerPage: number) => async (dispatch: any, getState: any) => {
    if (startIndex === getState().grades.startIndex && rowsPerPage === getState().grades.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestGradesType, startIndex, rowsPerPage});
    const url = `api/Main/Grades?startIndex=${startIndex}&amount=${rowsPerPage}`;
    const response = await fetch(url);
    const grades = await response.json();

    dispatch({type: receiveGradesType, startIndex, rowsPerPage, grades});
    return Promise.resolve();
  },

  addGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const grades = getState().grades.grades;
    grades.push(grades);
    dispatch({type: addGradeType, grades});
  },
  editGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const grades = getState().grades.grades;
    grades.push(grades);
    dispatch({type: editGradeType, grades});
  },
  removeGrade: (grade: any) => async (dispatch: any, getState: any) => {
    const grades = getState().grades.grades;
    grades.push(grades);
    dispatch({type: removeGradeType, grades});
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
      grades: action.grades,
      isLoading: false
    };
  }

  if (action.type === addGradeType) {
    return {
      ...state,
      grades: action.grades
    };
  }

  return state;
};
