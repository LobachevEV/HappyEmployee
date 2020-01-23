import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Grid, Typography} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {actionCreators} from "../../store/Employees";
import {Link} from "react-router-dom";

class Employees extends Component<any> {
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
    const {items, startIndex, rowsPerPage, requestEmployees, history, total} = this.props;
    return (
      <div>
        <Typography variant={"h4"}>Employees</Typography>        
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={items} total={total} page={(startIndex || 0) / rowsPerPage}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {
                       console.log(newPage);
                       console.log(rowsPerPage);
                       const newStartIndex = Math.max(newPage,0) * rowsPerPage;
                       requestEmployees(newStartIndex, rowsPerPage);
                       history.push(`/Employees/${newStartIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       const newStartIndex = 0;
                       requestEmployees(newStartIndex, newRowsPerPage);
                       history.push(`/Employees/${newStartIndex}/${newRowsPerPage}`);
                     }}
                     actions={[<Button color="primary" variant="outlined"><Link to={{pathname:"/employees/0" }}>Create Employee</Link></Button>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.employees,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Employees);
