import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../store/WeatherForecasts";
import {Grid, Typography} from "@material-ui/core";
import {createBrowserHistory} from "history";
import RichTable, {IColumn} from "./core/RichTable";
import EditFormDialog from "./EditFormDialog";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const history = createBrowserHistory({basename: baseUrl});

class Forecast extends Component<any> {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    const rowsPerPage = parseInt(this.props.match.params.rowsPerPage, 10) || 5;
    this.props.requestWeatherForecasts(startDateIndex, rowsPerPage);
  }

  private columns: IColumn[] = [
    {title: "Date", format: (item) => item.dateFormatted},
    {title: "Temp. (C)", format: (item) => item.temperatureC},
    {title: "Temp. (F)", format: (item) => item.temperatureF},
    {title: "Summary", format: (item) => item.summary},
  ];

  render() {
    const {forecasts, startDateIndex, rowsPerPage, requestWeatherForecasts} = this.props;
    
    function onEditCancel() {
        
    }
    
    function onSave() {
    
    }
    
    return (
      <div>
        <Typography variant={"h4"}>Weather forecast</Typography>
        <Typography component={"p"}>This component demonstrates fetching data from the server and working with URL
          parameters.</Typography>
        <Grid item xs={12}>
          <RichTable columns={this.columns} items={forecasts} total={100} page={(startDateIndex || 0) / 5}
                     rowsPerPage={(rowsPerPage || 5)}
                     onChangePage={(e, newPage) => {
                       const newStartDateIndex = newPage * rowsPerPage;
                       requestWeatherForecasts(newStartDateIndex, rowsPerPage);
                       history.push(`/fetch-data/${newStartDateIndex}/${rowsPerPage}`);
                     }}
                     onChangeRowsPage={newRowsPerPage => {
                       this.props.requestWeatherForecasts(startDateIndex, newRowsPerPage);
                       history.push(`/fetch-data/${startDateIndex}/${newRowsPerPage}`);
                     }}
          actions={[<EditFormDialog title={"New forecast"} buttonCaption={"Add forecast"} onCancel={onEditCancel} onSave={onSave}/>]}/>
        </Grid>
      </div>
    );
  }
}

export default connect<any>(
  (state: any) => state.weatherForecasts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Forecast);
