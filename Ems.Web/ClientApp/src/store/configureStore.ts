import * as WeatherForecasts from "./WeatherForecasts";
import * as DialogActions from "./DialogActions";
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

export default function configureStore(history: any, initialState: any) {
  const reducers = {
    weatherForecasts: WeatherForecasts.reducer,
    dialogActions: DialogActions.reducer
  };

  const middleware = [
    thunk
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
