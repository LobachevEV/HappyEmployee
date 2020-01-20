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

class EmployeeEditDialog extends React.Component<IEmployeeEditDialogProps, IEmployee> {
  readonly id: number = 0;
  name: string = "";
  gradeId: number = 0;
  positionId: number = 0;
  personalCostMultiplier: number = 1;

  constructor(props: IEmployeeEditDialogProps) {
    super(props);
    this.state = {id: 0, name: "", gradeId: 0, positionId: 0, personalCostMultiplier: 1};
    if (this.props.employee) {
      this.setState(this.props.employee);      
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
    const {personalCostMultiplier, name} = this.state;

    const handleChange = (event: any) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      // @ts-ignore
      this.setState({[name]:value});      
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
    return <EditFormDialog title={"New employee"} buttonCaption={"Add employee"} onSave={save}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="emp_name" name={"name"} label="Employee name" value={name} onChange={handleChange}/>
        </Grid>
        <Grid item xs={6}>
          <SelectCmp id={"position_id"} name={"position"} label="Position" onChange={handleChange}
                     items={positions.map((p: any) => ({value: p.id}))}/>
        </Grid>
        <Grid item xs={6}>
          <SelectCmp id={"grade_id"} name={"grade"} label="Grade" onChange={handleChange}
                     items={grades.map((g: any) => ({value: g.id, label: g.description}))}/>
        </Grid>
        <Grid item xs={12}>
          <TextField id="per_cost_mult" name={"personalCostMultiplier"} type="number" label="Personal cost multiplier"
                     onChange={handleChange}
                     value={personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
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
    addEmployee: employeesActionCreators.addEmployee
  }, dispatch)
)(EmployeeEditDialog);