import * as Employees from "./Employees";
import * as Grades from "./Grades";
import * as Positions from "./Positions";
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";


export default function configureStore(history: any, initialState: any) {
  const reducers = {
    employees: Employees.reducer,
    grades: Grades.reducer,
    positions: Positions.reducer,    
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
