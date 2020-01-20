import React from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../store/Grades";

interface IEmployeeEditDialog {
  employee?: IEmployee,
  save?: (employee: IEmployee) => any,
  grades?: any,
  positions?: any
}

const EmployeeEditDialog = (props: IEmployeeEditDialog) => {
  const [id] = React.useState(props.employee?.id);
  const [name, setName] = React.useState(props.employee?.name || "");
  const [gradeId, setGradeId] = React.useState(props.employee?.gradeId || 0);
  const [positionId, setPositionId] = React.useState(props.employee?.positionId || 0);
  const [personalCostMultiplier, setPersonalCostMultiplier] = React.useState(props.employee?.personalCostMultiplier || 0);

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };

  const handleGradeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGradeId(event.target.value as number);
  };

  const handlePositionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPositionId(event.target.value as number);
  };

  const handlePersonalCostMultiplierChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonalCostMultiplier(event.target.value as number);
  };

  const save = () => {
    if (props.save) {
      props.save({id, name, gradeId, positionId, personalCostMultiplier});
    }
    
  };

  return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="emp_name" label="Employee name" value={name} onChange={handleNameChange}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"position_id"} label="Position" onChange={handleGradeChange}
                   items={props.grades.items}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"grade_id"} label="Grade" onChange={handlePositionChange}
                   items={props.positions.items}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="per_cost_mult" type="number" label="Personal cost multiplier"
                   onChange={handlePersonalCostMultiplierChange}
                   value={personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
      </Grid>
    </Grid>
  </EditFormDialog>;
};


export default connect<any>(
  (state: any) => {
    return {grades: state.grades, positions: state.positions, save: state.employees.addEmployee}
  },
  dispatch => bindActionCreators(actionCreators, dispatch)
)(EmployeeEditDialog);