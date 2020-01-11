import React, {Component, ReactElement, ReactNodeArray, ReactPortal} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";


interface IEmployeeEditDialog {
  employee?: IEmployee,
  save: (employee: IEmployee) => any,
}

export default class EmployeeEditDialog extends Component<IEmployeeEditDialog> {
  id: number;
  name: string;
  gradeId: number;
  positionId: number;
  personalCostMultiplier: number;

  constructor(props: any) {
    super(props);
    this.id = props.employee?.id;
    this.name = props.employee?.name;
    this.gradeId = props.employee?.gradeId;
    this.positionId = props.employee?.positionsId;
    this.personalCostMultiplier = props.employee?.personalCostMultiplier;
  }

  render(): ReactElement | string | number | {} | ReactNodeArray | ReactPortal | boolean | null | undefined {
    const handleGradeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.gradeId = event.target.value as number;
    };
    const handlePositionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.positionId = event.target.value as number;
    };
    const save = () => {
      console.log("EmployeeEditDialog save");
      this.props.save({
        id: this.id,
        name: this.name,
        gradeId: this.gradeId,
        positionId: this.positionId,
        personalCostMultiplier: this.personalCostMultiplier
      });
    };

    return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="emp_name" label="Employee name" value={this.name}/>
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
                     value={this.personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
        </Grid>
      </Grid>
    </EditFormDialog>;
  }
}