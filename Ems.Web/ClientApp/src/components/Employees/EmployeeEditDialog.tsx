import React, {FunctionComponent, useEffect} from "react";
import {Grid, TextField} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators as employeesActionCreators} from "../../store/Employees";

interface IEmployeeEditDialog extends IChildComponentProps {

}

const ChildComp: FunctionComponent<IEmployeeEditDialog> = (props) => {
  const employee = props.entity as IEmployee;
  const handleChange = props.handleChange;
  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(gradesActionCreators.requestGrades());
    dispatch(positionsActionCreators.requestPositions());
  }, [props.entityId]);
  
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField id="emp_name" name={"name"} label="Employee name" value={employee?.name}
                 onChange={handleChange}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"position_id"} name={"positionId"} label="Position" onChange={handleChange}
                 value={employee?.positionId}
                 items={positions.map((p: any) => ({value: p.id}))}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"grade_id"} name={"gradeId"} label="Grade" onChange={handleChange}
                 value={employee?.gradeId}
                 items={grades.map((g: any) => ({value: g.id, label: g.description}))}/>
    </Grid>
    <Grid item xs={12}>
      <TextField id="per_cost_mult" type="number" InputProps={{inputProps: {step: 0.1}}}
                 label="Personal cost multiplier" onChange={handleChange}
                 value={employee?.personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
    </Grid>
  </Grid>;
};

const EmployeeEditDialog: FunctionComponent<{ match: any }> = ({match}) => {
  const EditDialog = createEditDialog({
    ChildComponent: ChildComp,
    save: employeesActionCreators.saveEmployee,
    getById: (state, id) => state.employees.items.find((e: IEmployee) => e.id === parseInt(id, 10)),
    entityName: "Employee",
    getTitle: entity => entity?.name
  });
  return <EditDialog match={match}/>
};


export default EmployeeEditDialog;