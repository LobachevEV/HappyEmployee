import React, {FunctionComponent} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {IGrade} from "../../Model/Api";
import {useDispatch} from "react-redux";

const GradeEditDialog:FunctionComponent<IGrade> = () => {
  const [description, setDescription] = React.useState("");
  const [costMultiplier, setCostMultiplier] = React.useState(0);
  const dispatch = useDispatch();

  const handleDescriptionChange = (event: any) => {
    const value = event.target.value as string;
    setDescription(value);
  };

  const handleCostMultiplierChange = (event: any) => {
    const value = event.target.value as number;
    setCostMultiplier(value);
  };

  const save = () => dispatch(gradesActionCreators.addGrade({id: 0, description, costMultiplier}));


  return <EditFormDialog title={"New grade"} buttonCaption={"Add grade"} onSave={save}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="grade_desc" label="Description" value={description} onChange={handleDescriptionChange}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="cost_mult" type="number" label="Cost multiplier" InputProps={{inputProps: {step: 0.1}}}
                   value={costMultiplier} onChange={handleCostMultiplierChange}/>
      </Grid>
    </Grid>
  </EditFormDialog>;
};

export default GradeEditDialog;