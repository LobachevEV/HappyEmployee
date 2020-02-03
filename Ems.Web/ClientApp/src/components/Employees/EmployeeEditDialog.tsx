import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {useDispatch, useSelector, useStore} from "react-redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators as employeesActionCreators} from "../../store/Employees";

interface IEmployeeEditDialog {
  match: any
}

const EmployeeEditDialog: FunctionComponent<IEmployeeEditDialog> = (props) => {
  const [id] = useState(parseInt(props.match.params.id, 10));
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gradesActionCreators.requestGrades());
    dispatch(positionsActionCreators.requestPositions());
  }, [id]);
  
  const store = useStore();
  const [employee, dispatchLocal] = useReducer((state: IEmployee, {type, value}: any) => ({[type]: value, ...state} as IEmployee),
    {id: parseInt(props.match.params.id, 10), gradeId: 0, positionId: 0, personalCostMultiplier: 1},
    arg => {      
      return store.getState().employees.items.find((e: IEmployee) => e.id === id);
    });
  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // @ts-ignore
    dispatchLocal({type: name, value});
  };

  const save = () => dispatch(employeesActionCreators.addEmployee(employee));

  return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
    <Grid container spacing={2}>
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
    </Grid>
  </EditFormDialog>;
};

export default EmployeeEditDialog;