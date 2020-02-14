import React, {FunctionComponent, useEffect, useReducer} from "react";
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
  const store = useStore();
  const [employee, dispatchLocal] = useReducer((state: IEmployee, {type, value}: any) => {
      switch (type) {
        case "SET_EMPLOYEE":
          return value as IEmployee;
        case "UPDATE_PROP":
          return {
            ...state,
            [value.name]: value.value
          } as IEmployee
      }
      return state;
    },
    {id: parseInt(props.match.params.id, 10), gradeId: 0, positionId: 0, personalCostMultiplier: 1} as IEmployee);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gradesActionCreators.requestGrades());
    dispatch(positionsActionCreators.requestPositions());
    const employee = store.getState().employees.items.find((e: IEmployee) => e.id === parseInt(props.match.params.id, 10));
    dispatchLocal({type: "SET_EMPLOYEE", value: employee})
  }, [props.match.params.id]);

  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // @ts-ignore
    dispatchLocal({type: "UPDATE_PROP", value:{name, value}});
  };

  const save = () => dispatch(employeesActionCreators.saveEmployee(employee));

  return <EditFormDialog title={employee?.name ?? "New employee"} buttonCaption={"Add employee"} onSave={save}>
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