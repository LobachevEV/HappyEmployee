import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Positions";
import {Button, Grid, Typography} from "@material-ui/core";
import {IColumn} from "../core/RichTable";
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

class Positions extends Component<IPositionsPageProps> {
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
    const {requestPositions, ...tableProps} = this.props;
    return (
      <div>
        <Typography variant={"h4"}>Positions</Typography>        
        <Grid item xs={12}>
          <EmsRichTable columns={this.columns} request={requestPositions} resource={"Positions"}
                        actions={[<Button color="primary" variant="outlined">
                          <Link to={{pathname: "/positions/0"}}>Add Position</Link>
                        </Button>]} {...tableProps}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.positions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Positions);
