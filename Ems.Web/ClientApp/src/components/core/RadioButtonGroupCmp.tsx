import React, {FunctionComponent} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup, {RadioGroupProps} from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export interface IRadioButton {
  value: any,
  label: string,
  disabled?: boolean;
}

interface IRadioButtonGroupCmpProps extends RadioGroupProps {
  buttons: IRadioButton[]
}

const RadioButtonGroupCmp: FunctionComponent<IRadioButtonGroupCmpProps> = (props) => {
  return <FormControl component="fieldset">
    <FormLabel component="legend">Availability</FormLabel>
    <RadioGroup name={props.name} value={props.value} onChange={props.onChange} row>
      {props.buttons.map(button => {
        return <FormControlLabel value={button.value} control={<Radio/>}
                                 label={button.label} disabled={button.disabled}/>
      })}
    </RadioGroup>
  </FormControl>
}

export default RadioButtonGroupCmp;