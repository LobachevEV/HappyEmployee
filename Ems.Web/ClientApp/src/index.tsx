import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router} from "react-router";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

declare global {
  interface Window {
    initialReduxState: any;
    devToolsExtension: any;
  }
}

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const history = createBrowserHistory({basename: baseUrl});

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router history={history}>
        <App/>
      </Router>
    </MuiPickersUtilsProvider>
  </Provider>,
  rootElement);

registerServiceWorker();
