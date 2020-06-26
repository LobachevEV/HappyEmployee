import React, {FunctionComponent} from "react";
import {Grid, TextField} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators} from "../../store/Employees";
import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

interface IEmployeeEditDialog extends IChildComponentProps {
}

const ChildComp: FunctionComponent<IEmployeeEditDialog> = (props) => {
  const employee = props.entity as IEmployee;
  const handleChange = props.handleChange;
  const handleEmploymentDateChange = (date: MaterialUiPickersDate) => handleChange({target:{name:"employmentDate", value:date?.toDate()}})
  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField id="emp_name" name={"name"} label="Employee name" value={employee?.name}
                 onChange={handleChange}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"position_id"} name={"positionId"} label="Position" onChange={handleChange}
                 value={employee?.positionId}
                 items={positions.map((p: any) => ({value: p.id, label: p.title}))}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"grade_id"} name={"gradeId"} label="Grade" onChange={handleChange}
                 value={employee?.gradeId}
                 items={grades.map((g: any) => ({value: g.id, label: g.description}))}/>
    </Grid>
    <Grid item xs={6}>
      <TextField id="per_cost_mult" type="number" InputProps={{inputProps: {step: 0.1}}} name={"personalCostMultiplier"}
                 label="Personal cost multiplier" onChange={handleChange}
                 value={employee?.personalCostMultiplier || 1} InputLabelProps={{shrink: true,}}/>
    </Grid>
    <Grid item xs={6}>
      <DatePicker id="per_cost_mult" type="text" name={"employmentDate"}
                  label="Employment date" onChange={handleEmploymentDateChange}
                  value={employee?.employmentDate || new Date()} InputLabelProps={{shrink: true,}}/>
    </Grid>
  </Grid>;
};

const EmployeeEditDialog: FunctionComponent = ({}) => {
  const dispatch = useDispatch();
  dispatch(gradesActionCreators.requestGrades());
  dispatch(positionsActionCreators.requestPositions());
  const EditDialog = createEditDialog({
    ChildComponent: ChildComp,
    save: entity => dispatch(actionCreators.saveEmployee(entity)),
    getById: (state, id) => state.employees.items.find((e: IEmployee) => e.id === parseInt(id, 10)),
    entityName: "Employee",
    getTitle: entity => entity?.name
  });
  return <EditDialog/>
};


export default EmployeeEditDialog;