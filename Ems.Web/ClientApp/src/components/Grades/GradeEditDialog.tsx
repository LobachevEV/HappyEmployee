import React, {FunctionComponent} from "react";
import {Grid, TextField} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import {actionCreators} from "../../store/Grades";
import {IGrade} from "../../Model/Api";

interface IGradeEditDialog extends IChildComponentProps {

}

const ChildComp: FunctionComponent<IGradeEditDialog> = (props) => {
  const grade = props.entity as IGrade;
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

const GradeEditDialog: FunctionComponent<{ match: any }> = ({ match}) => {
  const EditDialog = createEditDialog({
    ChildComponent: ChildComp,
    save: actionCreators.saveGrade,
    getById: (state, id) => state.grades.items.find((e: IGrade) => e.id === id),
    entityName: "Grade",
    getTitle: entity => entity?.Id
  });
  return <EditDialog match={match}/>
};


export default GradeEditDialog;