import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Grades";
import {Button, Grid, Typography} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {Link} from "react-router-dom";
import {IEmployee} from "../../Model/Api";
import EmsRichTable from "../core/EmsRichTable";

interface IGradesPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestGrades: (startIndex: number, rowsPerPage: number) => IEmployee[],
  history: any,
  match: any,
}

const Grades = function (props: IGradesPageProps) {
  const {requestGrades, items, history, match, ...tableProps} = props;


  useEffect(() => {
    const startIndex = parseInt(match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(match.params.rowsPerPage, 10) || 5;
    props.requestGrades(startIndex, rowsPerPage);
  }, [match.params.startIndex, match.params.rowsPerPage]);

  const columns: IColumn[] = [
    {title: "Description", format: (item) => item.description},
    {title: "Id", format: (item) => item.id},
    {title: "Cost multiplier", format: (item) => item.costMultiplier},
  ];
  return (
    <div>
      <Typography variant={"h4"}>Grades</Typography>
      <Grid item xs={12}>
        <RichTable columns={columns} items={items} onEditRow={handleEditRow}
                   actions={[<Button color="primary" variant="outlined">
                     <Link to={{pathname: "/grades/0"}}>Add Grade</Link>
                   </Button>]}/>        
      </Grid>
    </div>
  );

  function handleEditRow(item: any) {
    history.push(`/grades/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.grades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Grades);
