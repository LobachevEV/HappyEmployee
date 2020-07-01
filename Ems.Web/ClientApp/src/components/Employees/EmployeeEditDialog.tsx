import React, {FunctionComponent, useState} from "react";
import {createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {EmployeeAvailability, IEmployee} from "../../Model/Api";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators} from "../../store/Employees";
import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeAvatar: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  }),
);


interface IEmployeeEditDialog extends IChildComponentProps<IEmployee> {
}

const ChildComp: FunctionComponent<IEmployeeEditDialog> = (props) => {
  const employee = props.entity;
  console.log(employee);
  const handleChange = props.handleChange;
  const [employmentDateInFuture, setEmploymentDateInFuture] = useState(() => {
    if (employee.employmentDate)
      return moment(employee.employmentDate).isAfter();
    else
      return false;
  });
  
  const handleEmploymentDateChange = (pickerDate: MaterialUiPickersDate) => {
    const date = pickerDate?.toDate();
    setEmploymentDateInFuture(moment(date).isAfter())
    handleChange({
      target: {
        name: "employmentDate",
        value: date
      }
    });
  }
  
  const handleAvailabilityChange = (_: any, value:string) => {    
    handleChange({
      target: {
        name: "availability",
        value: +value
      }
    });
  }
  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);
  const classes = useStyles();
  return <Grid container spacing={2}>
    <Grid item container xs={12}>
      <Grid item xs={3}>
        <Avatar variant="rounded" className={classes.largeAvatar}>
          <AssignmentIcon/>
        </Avatar>
      </Grid>
      <Grid item container xs={9} spacing={2}>
        <Grid item xs={12}>
          <TextField id="emp_name" name={"name"} label="Employee name" value={employee.name}
                     onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Availability</FormLabel>
            <RadioGroup name="availability"
                        value={employee.availability} onChange={handleAvailabilityChange} row>
              <FormControlLabel value={EmployeeAvailability.willStartWorkSoon} control={<Radio/>}
                                label="Will start work soon" disabled={!employmentDateInFuture}/>
              <FormControlLabel value={EmployeeAvailability.available} control={<Radio/>} label="Available"
                                disabled={employmentDateInFuture}/>
              <FormControlLabel value={EmployeeAvailability.sickLeave} control={<Radio/>} label="Sick leave"
                                disabled={employmentDateInFuture}/>
              <FormControlLabel value={EmployeeAvailability.vacation} control={<Radio/>} label="Vacation"
                                disabled={employmentDateInFuture}/>
            </RadioGroup>
          </FormControl>          
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"position_id"} name={"positionId"} label="Position" onChange={handleChange}
                 value={employee.positionId}
                 items={positions.map((p: any) => ({value: p.id, label: p.title}))}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"grade_id"} name={"gradeId"} label="Grade" onChange={handleChange}
                 value={employee.gradeId}
                 items={grades.map((g: any) => ({value: g.id, label: g.description}))}/>
    </Grid>
    <Grid item xs={6}>
      <TextField id="per_cost_mult" type="number" InputProps={{inputProps: {step: 0.1}}} name={"personalCostMultiplier"}
                 label="Personal cost multiplier" onChange={handleChange}
                 value={employee.personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
    </Grid>
    <Grid item xs={6}>
      <DatePicker id="employment_date" type="text" name={"employmentDate"}
                  label="Employment date" onChange={handleEmploymentDateChange}
                  value={employee.employmentDate} InputLabelProps={{shrink: true,}}/>
    </Grid>
  </Grid>;
};

const EmployeeEditDialog: FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  dispatch(gradesActionCreators.requestGrades());
  dispatch(positionsActionCreators.requestPositions());
  const EditDialog = createEditDialog<IEmployee>({
    ChildComponent: ChildComp,
    save: entity => dispatch(actionCreators.saveEmployee(entity)),
    getById: (state, id) => state.employees.items.find((e: IEmployee) => e.id === parseInt(id, 10)),
    entityName: "Employee",
    getTitle: entity => entity?.name,
    setDefault(): IEmployee {
      return {
        name:"",
        gradeId: 1,
        positionId: 1,
        personalCostMultiplier: 1,
        employmentDate: new Date(),
        availability: EmployeeAvailability.available
      }
    }
  });
  return <EditDialog/>
};


export default EmployeeEditDialog;