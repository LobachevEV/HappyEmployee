import React from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {IEmployee} from "../../Model/Api";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import {actionCreators as employeesActionCreators} from "../../store/Employees";

interface IEmployeeEditDialogProps {
  employee?: IEmployee,
  addEmployee: (employee: IEmployee) => any,
  grades: any,
  requestGrades: any,
  positions: any,
  requestPositions: any
}

class EmployeeEditDialog extends React.Component<IEmployeeEditDialogProps> {
  readonly id: number = 0;
  name: string = "";
  gradeId: number = 0;
  positionId: number = 0;
  personalCostMultiplier: number = 1;

  constructor(props: IEmployeeEditDialogProps) {
    super(props);
    if (this.props.employee) {
      this.id = this.props.employee.id || 0;
      this.name = this.props.employee.name;
      this.gradeId = this.props.employee.gradeId;
      this.positionId = this.props.employee.positionId;
      this.personalCostMultiplier = this.props.employee.personalCostMultiplier;
    }
  }

  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.requestGrades();
    this.props.requestPositions();
  }

  render() {
    const {grades, positions} = this.props;

    const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.name = event.target.value as string;
    };

    const handleGradeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.gradeId = event.target.value as number;
    };

    const handlePositionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.positionId = event.target.value as number;
    };

    const handlePersonalCostMultiplierChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      this.personalCostMultiplier = event.target.value as number;
    };

    const save = () => {
      this.props.addEmployee({
        id: this.id,
        name: this.name,
        gradeId: this.gradeId,
        positionId: this.positionId,
        personalCostMultiplier: this.personalCostMultiplier
      });

    };
    console.log(grades, positions);
    return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="emp_name" label="Employee name" value={this.name} onChange={handleNameChange}/>
        </Grid>
        <Grid item xs={6}>
          <SelectCmp id={"position_id"} label="Position" onChange={handleGradeChange}
                     items={positions.map((p:any)=>({value: p.id}))}/>
        </Grid>
        <Grid item xs={6}>
          <SelectCmp id={"grade_id"} label="Grade" onChange={handlePositionChange}
                     items={grades.map((g:any)=>({value: g.id, label: g.description}))}/>
        </Grid>
        <Grid item xs={12}>
          <TextField id="per_cost_mult" type="number" label="Personal cost multiplier"
                     onChange={handlePersonalCostMultiplierChange}
                     value={this.personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
        </Grid>
      </Grid>
    </EditFormDialog>;
  }
}


export default connect<any>(
  (state: any) => ({grades: state.grades.items, positions: state.positions.items}),
  dispatch => bindActionCreators({
    requestGrades: gradesActionCreators.requestGrades,
    requestPositions: positionsActionCreators.requestPositions,
    adEmployee: employeesActionCreators.addEmployee
  }, dispatch)
)(EmployeeEditDialog);