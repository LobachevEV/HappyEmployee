import React from 'react';
import {Redirect, Route} from 'react-router';
import EmployeesPage from './components/Employees/EmployeesPage';
import EmployeeEditDialog from "./components/Employees/EmployeeEditDialog";
import GradeEditDialog from "./components/Grades/GradeEditDialog";
import PositionEditDialog from "./components/Positions/PositionEditDialog";
import Grid from "@material-ui/core/Grid";
import MenuBar from "./components/core/NavMenu";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import GradesPage from "./components/Grades/GradesPage";
import PositionsPage from "./components/Positions/PositionsPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1
    },
  }),
);

const App = () => {
  const classes = useStyles();
  console.log("Router")
  return <div className={classes.root}>
    <CssBaseline/>
    <main className={classes.content}>
      <MenuBar/>
      <Grid spacing={0} container alignContent={"center"}>

        <Route exact path='/'>
          <Redirect to="/employees"/>
        </Route>

        <Route exact path='/employees' component={EmployeesPage}/>
        <Route exact path='/employees/:id' component={EmployeesPage}/>
        <Route exact path='/employees/:id' component={EmployeeEditDialog}/>
        <Route exact path='/employees/:startIndex/:rowsPerPage' component={EmployeesPage}/>

        <Route exact path='/grades' component={GradesPage}/>
        <Route exact path='/grades/:id' component={GradesPage}/>
        <Route exact path='/grades/:id' component={GradeEditDialog}/>
        <Route exact path='/grades/:startIndex/:rowsPerPage' component={GradesPage}/>

        <Route exact path='/positions' component={PositionsPage}/>
        <Route exact path='/positions/:id' component={PositionsPage}/>
        <Route exact path='/positions/:id' component={PositionEditDialog}/>
        <Route exact path='/positions/:startIndex/:rowsPerPage' component={PositionsPage}/>
      </Grid>
    </main>
  </div>
};

export default App