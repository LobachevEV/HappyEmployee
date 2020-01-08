import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../store/Positions";
import {Grid, Typography} from "@material-ui/core";
import {createBrowserHistory} from "history";
import RichTable, {IColumn} from "./core/RichTable";
import EditFormDialog from "./EditFormDialog";

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
    const {positions, startIndex, rowsPerPage, requestPositions} = this.props;

    function onEditCancel() {

    }

    function onSave() {

    }

    return (
      <div>
        <Typography variant={"h4"}>Positions</Typography>        
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={positions} total={100} page={(startIndex || 0) / rowsPerPage}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {                       
                       const newStartIndex = newPage * rowsPerPage;
                       requestPositions(newStartIndex, rowsPerPage);
                       history.push(`/Positions/${newStartIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       this.props.requestPositions(startIndex, newRowsPerPage);
                       history.push(`/Positions/${startIndex}/${newRowsPerPage}`);
                     }}
                     actions={[<EditFormDialog title={"New position"} buttonCaption={"Add position"} onCancel={onEditCancel} onSave={onSave}/>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.positions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Positions);
