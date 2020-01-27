import React, {FunctionComponent, useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators as employeesActionCreators} from "../../store/Employees";

const EmployeeEditDialog: FunctionComponent<IEmployee> = (employee) => {
  const [id] = useState(employee?.id || 0);
  const [name, setName] = useState(employee?.name || "");
  const [gradeId, setGradeId] = useState(employee?.gradeId || 0);
  const [positionId, setPositionId] = useState(employee?.positionId || 0);
  const [personalCostMultiplier, setPersonalCostMultiplier] = useState(employee?.personalCostMultiplier || 1);

  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gradesActionCreators.requestGrades());
    dispatch(positionsActionCreators.requestPositions());
  }, [id]);

  const handleNameChange = (event: any) => {
    const value = event.target.value as string;
    setName(value);
  };

  const handleGradeIdChange = (event: any) => {
    const value = event.target.value as number;
    setGradeId(value);
  };
  const handlePositionIdChange = (event: any) => {
    const value = event.target.value as number;
    setPositionId(value);
  };
  const handlePersonalCostMultiplierChange = (event: any) => {
    const value = event.target.value as number;
    setPersonalCostMultiplier(value);
  };


  const save = () => dispatch(employeesActionCreators.addEmployee({
    id,
    name,
    gradeId,
    positionId,
    personalCostMultiplier
  }));

  return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="emp_name" name={"name"} label="Employee name" value={name} onChange={handleNameChange}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"position_id"} name={"positionId"} label="Position" onChange={handlePositionIdChange}
                   value={positionId}
                   items={positions.map((p: any) => ({value: p.id}))}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"grade_id"} name={"gradeId"} label="Grade" onChange={handleGradeIdChange} value={gradeId}
                   items={grades.map((g: any) => ({value: g.id, label: g.description}))}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="per_cost_mult" type="number" InputProps={{inputProps: {step: 0.1}}}
                   label="Personal cost multiplier" onChange={handlePersonalCostMultiplierChange}
                   value={personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
      </Grid>
    </Grid>
  </EditFormDialog>;
};

export default EmployeeEditDialog;