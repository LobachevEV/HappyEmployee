import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Grades";
import {Grid, Typography} from "@material-ui/core";
import {createBrowserHistory} from "history";
import RichTable, {IColumn} from "../core/RichTable";
import EditFormDialog from "../core/EditFormDialog";

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
    const {grades, startIndex, rowsPerPage, requestGrades} = this.props;

    function onEditCancel() {

    }

    function onSave() {

    }

    return (
      <div>
        <Typography variant={"h4"}>Grades</Typography>        
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={grades} total={100} page={(startIndex || 0) / rowsPerPage}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {                       
                       const newStartIndex = newPage * rowsPerPage;
                       requestGrades(newStartIndex, rowsPerPage);
                       history.push(`/Grades/${newStartIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       this.props.requestGrades(startIndex, newRowsPerPage);
                       history.push(`/Grades/${startIndex}/${newRowsPerPage}`);
                     }}
                     actions={[<EditFormDialog title={"New grade"} buttonCaption={"Add grade"} onCancel={onEditCancel} onSave={onSave}/>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.grades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Grades);
