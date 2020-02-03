import React from 'react';
import {Route, Switch} from 'react-router';
import Employees from './components/Employees/Employees';
import {Container} from "@material-ui/core";
import Grades from "./components/Grades/Grades";
import Positions from "./components/Positions/Positions";
import EmployeeEditDialog from "./components/Employees/EmployeeEditDialog";
import GradeEditDialog from "./components/Grades/GradeEditDialog";
import PositionEditDialog from "./components/Positions/PositionEditDialog";
import Grid from "@material-ui/core/Grid";

export default () => (
  <Container style={{height:"100vh"}}>
    <Grid spacing={0} container>
    <Switch>
      <Route exact path='/' component={Employees}/>
      <Route exact path='/employees' component={Employees}/>
      <Route exact path='/employees/:id' component={Employees}/>
      <Route exact path='/employees/:startIndex/:rowsPerPage' component={Employees}/>
      <Route exact path='/grades' component={Grades}/>
      <Route exact path='/grades/:id' component={Grades}/>
      <Route exact path='/grades/:startIndex/:rowsPerPage' component={Grades}/>
      <Route exact path='/positions' component={Positions}/>
      <Route exact path='/positions/:id' component={Positions}/>
      <Route exact path='/positions/:startIndex/:rowsPerPage' component={Positions}/>
    </Switch>
    <Route exact path='/employees/:id' component={EmployeeEditDialog}/>
    <Route exact path='/grades/:id' component={GradeEditDialog}/>
    <Route exact path='/positions/:id' component={PositionEditDialog}/>
    </Grid>
  </Container>
);
