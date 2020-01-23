import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Grades";
import {Button, Grid, Typography} from "@material-ui/core";
import {IColumn} from "../core/RichTable";
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

class Grades extends Component<IGradesPageProps> {
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
    const {requestGrades, ...tableProps} = this.props;
    return (
      <div>
        <Typography variant={"h4"}>Grades</Typography>
        <Grid item xs={12}>
          <EmsRichTable columns={this.columns} request={requestGrades} resource={"Grades"}
                        actions={[<Button color="primary" variant="outlined">
                          <Link to={{pathname: "/grades/0"}}>Add Grade</Link>
                        </Button>]} {...tableProps}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.grades,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Grades);
