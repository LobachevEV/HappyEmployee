import {createStyles, FormControl, InputLabel, makeStyles, MenuItem, SelectProps, Theme} from "@material-ui/core";
import React, {useEffect, useRef} from "react";
import Select from "@material-ui/core/Select";

export interface ISelectValue{
  value:any | undefined;
  label?:string
}

interface IProps extends SelectProps{
  label: string,
  items: ISelectValue[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {      
      minWidth: 120,
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const SelectCmp = (props: IProps) => {
  const classes = useStyles();
  
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);
  
  const {label, items} = props;
  return <FormControl className={classes.formControl}>
    <InputLabel ref={inputLabel} id="simple-select">{label}</InputLabel>
    <Select value={props.value || items[0]?.value} {...props} labelWidth={labelWidth}>
      {items.map(item => <MenuItem key={item.value} value={item.value}>{item.label || item.value}</MenuItem>)}
    </Select>
  </FormControl>
};
 export default SelectCmp;