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
  const handleChange1 = props.handleChange;

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField id="grade_desc" label="Description" value={grade?.description || ''}
                 onChange={event => handleChange1({description: event.target.value})}/>
    </Grid>
    <Grid item xs={12}>
      <TextField id="cost_mult" type="number" label="Cost multiplier"
                 InputProps={{inputProps: {step: 0.1}}}
                 value={grade?.costMultiplier} onChange={event => handleChange1({costMultiplier: event.target.value})}/>
    </Grid>
  </Grid>;
};

const GradeEditDialog: FunctionComponent = () => {
  const dispatch = useDispatch();
  const getEntityOrDefault = (state: any, id: any) => {
    const grade = state.grades.items.find((item: IGrade) => item.id === (parseInt(id, 10)));
    return grade ?? {
      description: "",
      costMultiplier: 1
    }
  };
  const EditDialog = createEditDialog({
    Body: ChildComp,
    save: grade => dispatch(actionCreators.saveGrade(grade)),
    getTitle: entity => entity.description || "New Grade",
    getEntityOrDefault: getEntityOrDefault,
  });
  return <EditDialog buttonCaption={"Add new Grade"}/>
};


export default GradeEditDialog;