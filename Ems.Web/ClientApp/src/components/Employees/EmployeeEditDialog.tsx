import React, {ReactElement, ReactNodeArray, ReactPortal} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";

interface IEmployeeEditDialog {
  employee?: IEmployee,
  save: (employee: IEmployee) => any,
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
    props.save({id, name, gradeId, positionId, personalCostMultiplier});
  };

  return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="emp_name" label="Employee name" value={name} onChange={handleNameChange}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"position_id"} label="Position" onChange={handleGradeChange}
                   items={[{value: "DevOps"}, {value: "HR Specialist"}, {value: "Project Manager"}, {value: "QA Specialist"}, {value: "Software Developer"},]}/>
      </Grid>
      <Grid item xs={6}>
        <SelectCmp id={"grade_id"} label="Grade" onChange={handlePositionChange}
                   items={[{value: 1, label: "Junior"}, {value: 2, label: "Mediocre"}, {value: 3, label: "Senior"}]}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="per_cost_mult" type="number" label="Personal cost multiplier"
                   onChange={handlePersonalCostMultiplierChange}
                   value={personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
      </Grid>
    </Grid>
  </EditFormDialog>;
};

export default EmployeeEditDialog