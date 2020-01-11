import React, {Component, ReactElement, ReactNodeArray, ReactPortal} from "react";
import {Grid, TextField} from "@material-ui/core";
import EditFormDialog from "../core/EditFormDialog";

export default class PositionEditDialog extends Component<any> {
  id: string;  
  costRate: number;

  constructor(props: any) {
    super(props);
    this.id = props.position?.id;    
    this.costRate = props.position?.costRate;
  }

  render(): ReactElement | string | number | {} | ReactNodeArray | ReactPortal | boolean | null | undefined {
    const save = () => {
      console.log({
        id: this.id,        
        personalCostMultiplier: this.costRate
      });
    };

    return <EditFormDialog title={"New position"} buttonCaption={"Add position"} onSave={save}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="position_id" label="Position name" value={this.id}/>
        </Grid>      
        <Grid item xs={12}>
          <TextField id="cost_rate" type="number" label="Cost rate" value={this.costRate}/>
        </Grid>
      </Grid>
    </EditFormDialog>;
  }
}