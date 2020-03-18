import React, {FunctionComponent} from "react";
import {Grid, TextField} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import {actionCreators} from "../../store/Positions";
import {IPosition} from "../../Model/Api";


interface IPositionEditDialog extends IChildComponentProps {

}

const ChildComp: FunctionComponent<IPositionEditDialog> = (props) => {
  const position = props.entity as IPosition;
  const handleChange = props.handleChange;

  console.log(position);
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField id="position_id" name="id" label="Position name" value={position?.id || ""} onChange={handleChange}/>
    </Grid>
    <Grid item xs={12}>
      <TextField id="cost_rate" name="constRate" type="number" label="Cost rate" InputProps={{inputProps: {step: 0.1}}}
                 value={position?.costRate || 1} onChange={handleChange}/>
    </Grid>
  </Grid>;
};

const PositionEditDialog: FunctionComponent<{ match: any }> = ({match}) => {
  const EditDialog = createEditDialog({
    ChildComponent: ChildComp,
    save: actionCreators.savePosition,
    getById: (state, id) => {
      console.log(id);
      return state.positions.items.find((e: IPosition) => e.id === id);
    },
    entityName: "Position",
    getTitle: entity => entity?.Id
  });
  return <EditDialog match={match}/>
};

export default PositionEditDialog;