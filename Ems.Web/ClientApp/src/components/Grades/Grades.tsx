import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Grades";
import {Button} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {Link, useParams} from "react-router-dom";
import {IEmployee} from "../../Model/Api";

interface IGradesPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestGrades: (startIndex: number, rowsPerPage: number) => IEmployee[],
  history: any,
}

const Grades = function (props: IGradesPageProps) {
  const {requestGrades, items, history} = props;
  const {startIndex, rowsPerPage} = useParams();

  useEffect(() => {
    const startIndexInt = startIndex && parseInt(startIndex, 10) || 0;
    const rowsPerPageInt = rowsPerPage && parseInt(rowsPerPage, 10) || 5;
    requestGrades(startIndexInt, rowsPerPageInt);
  }, [startIndex, rowsPerPage]);

  const columns: IColumn[] = [
    {title: "Description", format: (item) => item.description},
    {title: "Cost multiplier", format: (item) => item.costMultiplier},
  ];
  return (    
        <RichTable title={"Grades"} columns={columns} items={items} onEditRow={handleEditRow}
                   actions={[<Button component={Link} to={{pathname: "/grades/0"}} color="primary" variant="outlined">
                     Add Grade
                   </Button>]}/>        
  );

  function handleEditRow(item: any) {
    history.push(`/grades/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.grades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Grades);
