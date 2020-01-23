import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Grid, Typography} from "@material-ui/core";
import {IColumn} from "../core/RichTable";
import {actionCreators} from "../../store/Employees";
import {Link} from "react-router-dom";
import EmsRichTable from "../core/EmsRichTable";
import {IEmployee} from "../../Model/Api";

interface IEmployeesPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestEmployees: (startIndex: number, rowsPerPage: number) => IEmployee[],
  history: any,
  match: any,
}

class Employees extends Component<IEmployeesPageProps> {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(this.props.match.params.rowsPerPage, 10) || 5;
    this.props.requestEmployees(startIndex, rowsPerPage);
  }

  private columns: IColumn[] = [
    {title: "Name", format: (item) => item.name},
    {title: "Id", format: (item) => item.id},
    {title: "Grade", format: (item) => item.gradeId},
    {title: "Position", format: (item) => item.positionId},
    {title: "Personal Cost Mult.", format: (item) => item.personalCostMultiplier},
  ];

  render() {
    const {requestEmployees, ...tableProps} = this.props;
    return (
      <div>
        <Typography variant={"h4"}>Employees</Typography>
        <Grid item xs={12}>
          <EmsRichTable columns={this.columns} request={requestEmployees} resource={"Employees"}
                        actions={[<Button color="primary" variant="outlined">
                          <Link to={{pathname: "/employees/0"}}>Add Employee</Link>
                        </Button>]} {...tableProps}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.employees,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Employees);
