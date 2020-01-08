const requestPositionsType = "REQUEST_POSITIONS";
const receivePositionsType = "RECEIVE_POSITIONS";
const addPositionType = "ADD_POSITION";
const editPositionType = "EDIT_POSITION";
const removePositionType = "REMOVE_POSITION";
const initialState = {positions: [], isLoading: false};

export const actionCreators = {
  requestPositions: (startIndex: number, rowsPerPage: number) => async (dispatch: any, getState: any) => {
    if (startIndex === getState().positions.startIndex && rowsPerPage === getState().positions.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestPositionsType, startIndex, rowsPerPage});
    const url = `api/Main/Positions?startIndex=${startIndex}&amount=${rowsPerPage}`;
    const response = await fetch(url);
    const positions = await response.json();

    dispatch({type: receivePositionsType, startIndex, rowsPerPage, positions});
    return Promise.resolve();
  },

  addPosition: (position: any) => async (dispatch: any, getState: any) => {
    const positions = getState().positions.positions;
    positions.push(positions);
    dispatch({type: addPositionType, positions});
  },
  editPosition: (position: any) => async (dispatch: any, getState: any) => {
    const positions = getState().positions.positions;
    positions.push(positions);
    dispatch({type: editPositionType, positions});
  },
  removePosition: (position: any) => async (dispatch: any, getState: any) => {
    const positions = getState().positions.positions;
    positions.push(positions);
    dispatch({type: removePositionType, positions});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  if (action.type === requestPositionsType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      isLoading: true
    };
  }

  if (action.type === receivePositionsType) {
    return {
      ...state,
      startIndex: action.startIndex,
      rowsPerPage: action.rowsPerPage,
      positions: action.positions,
      isLoading: false
    };
  }

  if (action.type === addPositionType) {
    return {
      ...state,
      positions: action.positions
    };
  }

  return state;
};
