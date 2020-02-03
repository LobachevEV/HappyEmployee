import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Positions";
import {Button, Grid, Typography} from "@material-ui/core";
import RichTable, {IColumn} from "../core/RichTable";
import {Link} from "react-router-dom";
import EmsRichTable from "../core/EmsRichTable";
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
  });

  const columns: IColumn[] = [
    {title: "Id", format: (item) => item.id},
    {title: "Cost rate", format: (item) => item.costRate},
  ];
  return (
    <div>
      <Typography variant={"h4"}>Positions</Typography>
      <Grid item xs={12}>
        <RichTable columns={columns} items={items} onEditRow={handleEditRow}
                   actions={[<Button color="primary" variant="outlined">
                     <Link to={{pathname: "/positions/0"}}>Add Grade</Link>
                   </Button>]}/>        
      </Grid>
    </div>
  );

  function handleEditRow(item: any) {
    history.push(`/positions/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.positions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Positions);
