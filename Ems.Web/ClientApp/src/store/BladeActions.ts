const OPEN_BLADE = 'OPEN_BLADE';
const CLOSE_BLADE = 'CLOSE_BLADE';
const initialState = {blades: [],};

export const actionCreators = {
  openBLADE: (obj: any) => async (dispatch: any, getState: any) => {
    dispatch({type: OPEN_BLADE, obj});
  },
  closeBLADE: (obj: any) => async (dispatch: any, getState: any) => {
    dispatch({type: CLOSE_BLADE, obj});
  }
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;
  switch (action.type) {
    case OPEN_BLADE:
      return {
        ...state,
        blades: state.BLADEs.concat(action.obj)
      };
    case CLOSE_BLADE:
      return {
        ...state,
        blades: state.BLADEs.filter((item: any) => item.id !== action.obj.id),
      };
    default:
      return state;
  }
};