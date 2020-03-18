import {IPosition} from "../Model/Api";

const requestPositionsType = "REQUEST_POSITIONS";
const receivePositionsType = "RECEIVE_POSITIONS";
const addPositionType = "ADD_POSITION";
const editPositionType = "EDIT_POSITION";
const removePositionType = "REMOVE_POSITION";
const initialState = {items: [],total:0, isLoading: false};

export const actionCreators = {
  requestPositions: () => async (dispatch: any, getState: any) => {   
    dispatch({type: requestPositionsType});
    const url = `api/Positions`;
    const response = await fetch(url);
    const {positions, total} = await response.json();

    dispatch({type: receivePositionsType, items:positions, total});
    return Promise.resolve();
  },

  savePosition: (position: IPosition) => async (dispatch: any, getState: any) => {
    const url = `api/Save?type=Position`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url,{method:"POST", body: JSON.stringify(position), headers:headers});
    const result = await response.json();
    const items = getState().positions.items;
    items.push(result);
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
      isLoading: true
    };
  }

  if (action.type === receivePositionsType) {
    return {
      ...state,      
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
