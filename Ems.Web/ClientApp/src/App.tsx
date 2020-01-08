import React from 'react';
import {Route} from 'react-router';
import Employees from './components/Employees';
import {Container} from "@material-ui/core";

export default () => (
  <Container>
    <Route exact path='/' component={Employees}/>
    <Route exact path='/employees' component={Employees}/>
  </Container>
);
