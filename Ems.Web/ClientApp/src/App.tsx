import React from 'react';
import {Route, Switch} from 'react-router';
import Employees from './components/Employees/Employees';
import {Container} from "@material-ui/core";
import Grades from "./components/Grades/Grades";
import Positions from "./components/Positions/Positions";
import EmployeeEditDialog from "./components/Employees/EmployeeEditDialog";

export default () => (
  <Container>
    <Switch>
      <Route exact path='/' component={Employees}/>
      <Route exact path='/employees' component={Employees}/>
      <Route exact path='/employees/:id' component={Employees}/>
      <Route exact path='/employees/:startIndex/:rowsPerPage' component={Employees}/>
      <Route exact path='/grades' component={Grades}/>
      <Route exact path='/positions' component={Positions}/>
    </Switch>
    <Route exact path='/employees/:id' component={EmployeeEditDialog}/>
  </Container>
);
