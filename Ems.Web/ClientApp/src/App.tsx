import React from 'react';
import {Route} from 'react-router';
import Home from './components/Home';
import Forecast from './components/Forecast';
import {Container} from "@material-ui/core";

export default () => (
  <Container>
    <Route exact path='/' component={Home} />    
    <Route path='/forecast/:startDateIndex?/:rowsPerPage?' component={Forecast} />
  </Container>
);
