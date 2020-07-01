import React, {FunctionComponent} from "react";
import {Grid, TextField} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import {actionCreators} from "../../store/Grades";
import {IGrade} from "../../Model/Api";
import {useDispatch} from "react-redux";

interface IGradeEditDialog extends IChildComponentProps<IGrade> {

}

const ChildComp: FunctionComponent<IGradeEditDialog> = (props) => {
  const grade = props.entity;
  const handleChange = props.handleChange;

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField id="grade_desc" name="description" label="Description" value={grade?.description || ''}
                 onChange={handleChange}/>
    </Grid>
    <Grid item xs={12}>
      <TextField id="cost_mult" name="costMultiplier" type="number" label="Cost multiplier"
                 InputProps={{inputProps: {step: 0.1}}}
                 value={grade?.costMultiplier} onChange={handleChange}/>
    </Grid>
  </Grid>;
};

const GradeEditDialog: FunctionComponent = () => {
  const dispatch = useDispatch();
  const EditDialog = createEditDialog({
    ChildComponent: ChildComp,
    save: entity => dispatch(actionCreators.saveGrade(entity)),
    getById: (state, id) => state.grades.items.find((e: IGrade) => e.id === id),
    entityName: "Grade",
    getTitle: entity => entity?.description
  });
  return <EditDialog/>
};


export default GradeEditDialog;