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
    entityName: "Grade",
    ChildComponent: ChildComp,
    getTitle: entity => entity?.description,
    save: grade => dispatch(actionCreators.saveGrade(grade)),
    getItemOrDefault: (state, id) => {
      const grade = state.grades.items.find((item:IGrade) => item.id === (parseInt(id, 10)));
      return grade ?? {
        description: "",
        costMultiplier: 1
      }
    },
  });
  return <EditDialog/>
};


export default GradeEditDialog;