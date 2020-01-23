const requestPositionsType = "REQUEST_POSITIONS";
const receivePositionsType = "RECEIVE_POSITIONS";
const addPositionType = "ADD_POSITION";
const editPositionType = "EDIT_POSITION";
const removePositionType = "REMOVE_POSITION";
const initialState = {items: [],total:0, isLoading: false};

export const actionCreators = {
  requestPositions: (startIndex?: number, rowsPerPage?: number) => async (dispatch: any, getState: any) => {
    if (startIndex && startIndex === getState().positions.startIndex && rowsPerPage && rowsPerPage === getState().positions.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;


    dispatch({type: requestPositionsType, startIndex, rowsPerPage});
    const url = `api/Positions?startIndex=${startIndex || 0}&amount=${rowsPerPage || 0}`;
    const response = await fetch(url);
    const {positions, total} = await response.json();

    dispatch({type: receivePositionsType, startIndex, rowsPerPage, items:positions, total});
    return Promise.resolve();
  },

  addPosition: (position: any) => async (dispatch: any, getState: any) => {
    const items = getState().positions.items;
    items.push(items);
    dispatch({type: addPositionType, items});
  },
  editPosition: (position: any) => async (dispatch: any, getState: any) => {
    const items = getState().positions.items;
    items.push(items);
    dispatch({type: editPositionType, items});
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
      items: action.items,
      total: action.total,
      isLoading: false
    };
  }

  if (action.type === addPositionType) {
    return {
      ...state,
      items: action.items
    };
  }

  return state;
};
