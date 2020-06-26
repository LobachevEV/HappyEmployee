import React from 'react';
import {Redirect, Route} from 'react-router';
import Employees from './components/Employees/Employees';
import Grades from "./components/Grades/Grades";
import Positions from "./components/Positions/Positions";
import EmployeeEditDialog from "./components/Employees/EmployeeEditDialog";
import GradeEditDialog from "./components/Grades/GradeEditDialog";
import PositionEditDialog from "./components/Positions/PositionEditDialog";
import Grid from "@material-ui/core/Grid";
import MenuBar from "./components/core/NavMenu";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

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
  return <div className={classes.root}>
    <CssBaseline/>
    <main className={classes.content}>
      <MenuBar/>
      <Grid spacing={0} container alignContent={"center"}>

        <Route exact path='/'>
          <Redirect to="/employees"/>
        </Route>

        <Route exact path='/employees' component={Employees}/>
        <Route exact path='/employees/:id' component={Employees}/>
        <Route exact path='/employees/:id' component={EmployeeEditDialog}/>
        <Route exact path='/employees/:startIndex/:rowsPerPage' component={Employees}/>

        <Route exact path='/grades' component={Grades}/>
        <Route exact path='/grades/:id' component={Grades}/>
        <Route exact path='/grades/:id' component={GradeEditDialog}/>
        <Route exact path='/grades/:startIndex/:rowsPerPage' component={Grades}/>

        <Route exact path='/positions' component={Positions}/>
        <Route exact path='/positions/:id' component={Positions}/>
        <Route exact path='/positions/:id' component={PositionEditDialog}/>
        <Route exact path='/positions/:startIndex/:rowsPerPage' component={Positions}/>
      </Grid>
    </main>
  </div>
};

export default App