import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Positions";
import {Button} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {Link, useParams} from "react-router-dom";
import {IEmployee, IPosition} from "../../Model/Api";

interface IPositionsPageProps {
  items: Array<IEmployee>,
  total: number,
  history: any,

  requestPositions(startIndex: number, rowsPerPage: number): IEmployee[],

  removePosition(id: number): void
}

const Positions = function (props: IPositionsPageProps) {
  const {requestPositions, items, history, removePosition} = props;
  const {startIndex, rowsPerPage} = useParams();
  useEffect(() => {
    const startIndexInt = startIndex && parseInt(startIndex, 10) || 0;
    const rowsPerPageInt = rowsPerPage && parseInt(rowsPerPage, 10) || 5;
    requestPositions(startIndexInt, rowsPerPageInt);
  }, [startIndex, rowsPerPage]);

  const columns: IColumn[] = [
    {title: "Title", format: (item) => item.title},
    {title: "Cost rate", format: (item) => item.costRate},
  ];
  return (
    <RichTable title={"Positions"} columns={columns} items={items} onEditRow={handleEditRow}
               onDeleteRow={item => removePosition(item.id)}
               deleteConfirmationMessage={(position: IPosition) => `Confirm deleting the Position ${position.title}`}
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
