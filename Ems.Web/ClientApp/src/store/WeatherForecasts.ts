const requestWeatherForecastsType = "REQUEST_WEATHER_FORECASTS";
const receiveWeatherForecastsType = "RECEIVE_WEATHER_FORECASTS";
const addWeatherForecastType = "ADD_WEATHER_FORECAST";
const editWeatherForecastType = "EDIT_WEATHER_FORECAST";
const removeWeatherForecastType = "REMOVE_WEATHER_FORECAST";
const initialState = {forecasts: [], isLoading: false};

export const actionCreators = {
  requestWeatherForecasts: (startDateIndex: number, rowsPerPage: number) => async (dispatch: any, getState: any) => {
    if (startDateIndex === getState().weatherForecasts.startDateIndex && rowsPerPage === getState().weatherForecasts.rowsPerPage)
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    
    
    dispatch({type: requestWeatherForecastsType, startDateIndex, rowsPerPage});
    const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}&rowsPerPage=${rowsPerPage}`;
    const response = await fetch(url);
    const forecasts = await response.json();
    
    dispatch({type: receiveWeatherForecastsType, startDateIndex, rowsPerPage, forecasts});
    return Promise.resolve();
  },
  
  addWeatherForecast: (forecast: any) => async (dispatch: any, getState: any) => {
    const forecasts = getState().weatherForecasts.forecasts;
    forecasts.push(forecasts);
    dispatch({type: addWeatherForecastType, forecasts});
  },
  editWeatherForecast: (forecast: any) => async (dispatch: any, getState: any) => {
    const forecasts = getState().weatherForecasts.forecasts;
    forecasts.push(forecasts);
    dispatch({type: editWeatherForecastType, forecasts});
  } ,
  removeWeatherForecast: (forecast: any) => async (dispatch: any, getState: any) => {
    const forecasts = getState().weatherForecasts.forecasts;
    forecasts.push(forecasts);
    dispatch({type: removeWeatherForecastType, forecasts});
  },
};

export const reducer = (state: any, action: any) => {
  state = state || initialState;
  
  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      rowsPerPage: action.rowsPerPage,
      isLoading: true
    };
  }
  
  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      rowsPerPage: action.rowsPerPage,
      forecasts: action.forecasts,
      isLoading: false
    };
  }
  
  if (action.type === addWeatherForecastType){
    return {
      ...state,
      forecasts: action.forecasts
    };
  }
  
  return state;
};
