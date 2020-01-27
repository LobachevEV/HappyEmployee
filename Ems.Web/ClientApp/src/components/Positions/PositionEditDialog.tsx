import React, {FunctionComponent, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import {actionCreators} from "../../store/Positions";
import {IPosition} from "../../Model/Api";
import {useDispatch} from "react-redux";

const PositionEditDialog:FunctionComponent<IPosition> = ()=>{
  const [id, setId] = useState();
  const [costRate, setCostRate] = useState();
  const dispatch = useDispatch();

  const handleIdChange = (event: any) => {
    const value = event.target.value as string;
    setId(value);
  };

  const handleCostRateChange = (event: any) => {
    const value = event.target.value as number;
    setCostRate(value);
  };
  
  const save = () => dispatch(actionCreators.addPosition({id, costRate}));
  
  return <EditFormDialog title={"New position"} buttonCaption={"Add position"} onSave={save}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="position_id" label="Position name" value={id} onChange={handleIdChange}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="cost_rate" type="number" label="Cost rate" InputProps={{inputProps :{step:0.1}}} value={costRate} onChange={handleCostRateChange}/>
      </Grid>
    </Grid>
  </EditFormDialog>;
};

export default PositionEditDialog;