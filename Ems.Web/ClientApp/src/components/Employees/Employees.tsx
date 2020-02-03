import React, {FunctionComponent, useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {actionCreators} from "../../store/Employees";
import {Link} from "react-router-dom";
import {IEmployee} from "../../Model/Api";
import RichTable, {IColumn} from "../core/RichTable";
import {History, LocationState} from "history";

interface IEmployeesPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestEmployees: (startIndex: number, rowsPerPage: number) => IEmployee[],
  history: History<LocationState>,
  match: any,
}

const Employees: FunctionComponent<IEmployeesPageProps> = (props: IEmployeesPageProps) => {
  const {requestEmployees, items, history, match} = props;
  const columns: IColumn[] = [
    {title: "Id", format: (item) => item.id},
    {title: "Name", format: (item) => item.name},
    {title: "Grade", format: (item) => item.gradeId},
    {title: "Position", format: (item) => item.positionId},
    {title: "Personal Cost Mult.", format: (item) => item.personalCostMultiplier},
  ];

  useEffect(() => {
    const startIndex = parseInt(match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(match.params.rowsPerPage, 10) || 5;
    props.requestEmployees(startIndex, rowsPerPage);
  }, [match.params.startIndex, match.params.rowsPerPage]);

  return (    
      <Grid item xs={4}>
        <RichTable title={"Employees"} columns={columns} items={items} onEditRow={handleEditRow}
                   actions={[<Button color="primary" variant="outlined">
                     <Link to={{pathname: "/employees/0"}}>Add Employee</Link>
                   </Button>]}/>
      </Grid>    
  );

  function handleEditRow(item: any) {
    history.push(`/employees/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.employees,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Employees);
