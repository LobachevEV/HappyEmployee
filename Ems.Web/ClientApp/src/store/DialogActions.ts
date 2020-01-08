const closeType = "CLOSE";

export const actionCreators = {
  close: () => async (dispatch: any, getState: any) => {
    dispatch({type: closeType});
  }
};
export const reducer = (state: any, action: any) => {

  if (action.type === closeType)
    return {
    ...state,
      open: false
    };

    return {...state};
};