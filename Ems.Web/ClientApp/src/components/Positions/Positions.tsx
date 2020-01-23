import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Positions";
import {Button, Grid, Typography} from "@material-ui/core";
import {createBrowserHistory} from "history";
import RichTable, {IColumn} from "../core/RichTable";
import EditFormDialog from "../core/EditFormDialog";
import PositionEditDialog from "./EmployeeEditDialog";
import {Link} from "react-router-dom";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const history = createBrowserHistory({basename: baseUrl});

class Positions extends Component<any> {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(this.props.match.params.rowsPerPage, 10) || 5;
    this.props.requestPositions(startIndex, rowsPerPage);
  }

  private columns: IColumn[] = [    
    {title: "Id", format: (item) => item.id},
    {title: "Cost rate", format: (item) => item.costRate},    
  ];

  render() {
    const {items, total, startIndex, rowsPerPage, requestPositions} = this.props;

    function onEditCancel() {

    }

    function onSave() {

    }

    return (
      <div>
        <Typography variant={"h4"}>Positions</Typography>        
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={items} total={total} page={(startIndex || 0) / rowsPerPage}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {
                       const newStartIndex = Math.max(newPage,0) * rowsPerPage;
                       requestPositions(newStartIndex, rowsPerPage);
                       history.push(`/Positions/${newStartIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       const newStartIndex = 0;
                       requestPositions(newStartIndex, newRowsPerPage);
                       history.push(`/Positions/${newStartIndex}/${newRowsPerPage}`);
                     }}
                     actions={[<Button color="primary" variant="outlined"><Link to={{pathname:"/positions/0" }}>Add Position</Link></Button>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.positions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Positions);
