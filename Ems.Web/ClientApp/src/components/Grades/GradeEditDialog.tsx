import React, {Component, ReactElement, ReactNodeArray, ReactPortal} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";

export default class GradeEditDialog extends Component<any> {
  description: string;  
  costMultiplier: number;

  constructor(props: any) {
    super(props);
    this.description = props.grade?.name;
    this.costMultiplier = props.grade?.personalCostMultiplier;
  }

  render(): ReactElement | string | number | {} | ReactNodeArray | ReactPortal | boolean | null | undefined {
    
    const save = () => {
      console.log({
        name: this.description,
        personalCostMultiplier: this.costMultiplier
      });
    };

    return <EditFormDialog title={"New grade"} buttonCaption={"Add grade"} onSave={save}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="grade_desc" label="Description" value={this.description}/>
        </Grid>
        <Grid item xs={12}>
          <TextField id="cost_mult" type="number" label="Cost multiplier" value={this.costMultiplier}/>
        </Grid>
      </Grid>
    </EditFormDialog>;
  }
}