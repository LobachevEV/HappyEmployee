import {IEmployee, IPosition} from "../Model/Api";

const requestPositionsType = "REQUEST_POSITIONS";
const receivePositionsType = "RECEIVE_POSITIONS";
const addPositionType = "ADD_POSITION";
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
    const updatedGradeIdx = items.findIndex((emp: IEmployee) => emp.id === result.id)
    if (updatedGradeIdx === -1)
      items.push(result);
    else
      items[updatedGradeIdx] = result;
    dispatch({type: addPositionType, items});
  },
  removePosition: (id: number) => async (dispatch: any, getState: any) => {
    const url = `api/Delete?type=Position`;
    const headers = new Headers({'Accept': 'application/json', "Content-Type": "application/json"});
    const response = await fetch(url,{method:"DELETE", body: JSON.stringify(id), headers:headers});
    const deletedId =  await response.json();
    const items = getState().positions.items.filter((position:IPosition) => position.id !== deletedId);
    dispatch({type: removePositionType, items});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;

  switch (action.type) {
    case requestPositionsType:
      return {
        ...state,
        isLoading: true
      };
    case receivePositionsType:
      return {
        ...state,
        items: action.items,
        total: action.total,
        isLoading: false
      };
    case addPositionType:
      return {
        ...state,
        items: action.items
      };
    case removePositionType:
      return {
        ...state,
        items: action.items
      };
  }
  return state;
};

