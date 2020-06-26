import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Positions";
import {Button} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {Link} from "react-router-dom";
import {IEmployee} from "../../Model/Api";

interface IPositionsPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestPositions: (startIndex: number, rowsPerPage: number) => IEmployee[],
  history: any,
  match: any,
}

const Positions = function (props: IPositionsPageProps) {
  const {requestPositions, items, match, history} = props;
  useEffect(() => {
    const startIndex = parseInt(match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(match.params.rowsPerPage, 10) || 5;
    requestPositions(startIndex, rowsPerPage);
  }, [match.params.startIndex, match.params.rowsPerPage]);

  const columns: IColumn[] = [
    {title: "Title", format: (item) => item.title},
    {title: "Cost rate", format: (item) => item.costRate},
  ];
  return (
    <RichTable title={"Positions"} columns={columns} items={items} onEditRow={handleEditRow}
               actions={[<Button component={Link} to={{pathname: "/positions/0"}} color="primary" variant="outlined">
                 Add Position
               </Button>]}/>
  );

  function handleEditRow(item: any) {
    history.push(`/positions/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.positions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Positions);
