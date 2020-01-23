import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Grades";
import {Button, Grid, Typography} from "@material-ui/core";
import {createBrowserHistory} from "history";
import RichTable, {IColumn} from "../core/RichTable";
import {Link} from "react-router-dom";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const history = createBrowserHistory({basename: baseUrl});

class Grades extends Component<any> {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
    const rowsPerPage = parseInt(this.props.match.params.rowsPerPage, 10) || 5;
    this.props.requestGrades(startIndex, rowsPerPage);
  }

  private columns: IColumn[] = [
    {title: "Description", format: (item) => item.description},
    {title: "Id", format: (item) => item.id},
    {title: "Cost multiplier", format: (item) => item.costMultiplier},    
  ];

  render() {
    const {items, total, startIndex, rowsPerPage, requestGrades} = this.props;

    function onEditCancel() {

    }

    function onSave() {

    }

    return (
      <div>
        <Typography variant={"h4"}>Grades</Typography>        
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={items} total={total} page={(startIndex || 0) / rowsPerPage}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {
                       const newStartIndex = Math.max(newPage,0) * rowsPerPage;
                       requestGrades(newStartIndex, rowsPerPage);
                       history.push(`/Grades/${newStartIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       const newStartIndex = 0;
                       requestGrades(newStartIndex, newRowsPerPage);
                       history.push(`/Grades/${newStartIndex}/${newRowsPerPage}`);
                     }}
                     actions={[<Button color="primary" variant="outlined"><Link to={{pathname:"/grades/0" }}>Add Grade</Link></Button>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.grades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Grades);
