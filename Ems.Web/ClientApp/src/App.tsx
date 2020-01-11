import React from 'react';
import {Route} from 'react-router';
import Employees from './components/Employees';
import {Container} from "@material-ui/core";
import Grades from "./components/Grades";
import Positions from "./components/Positions";
import BladePanel from "./components/core/Blades/BladePanel";

export default () => (
  <Container>
    <Route exact path='/' component={BladePanel}/>
    <Route exact path='/employees' component={Employees}/>
    <Route exact path='/employees/:startIndex/:rowsPerPage' component={Employees}/>
    <Route exact path='/grades' component={Grades}/>
    <Route exact path='/Positions' component={Positions}/>
  </Container>
);