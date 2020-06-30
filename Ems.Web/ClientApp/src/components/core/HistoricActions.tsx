import {PropTypes} from "@material-ui/core";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import React from "react";

interface IDialogActionProps {
  label?: string,
  color: PropTypes.Color,
  invoke?: () => any,
}

interface IHistoricActionProps extends IDialogActionProps {
  to: string;
}

const HistoricActionButton = (props: IHistoricActionProps) => {
  const history = useHistory();
  const {to, color, label, invoke} = props;
  const handleAction = async () => {
    await invoke?.();
    history.push(to);
  };
  console.log(props.color);
  return <Button onClick={handleAction} color={color || "primary"} variant="outlined">
    {label}
  </Button>;
}

export const CancelButton = (props: IHistoricActionProps) => <HistoricActionButton {...props} label={props.label || "Cancel"}/>
export const SaveButton = (props: IHistoricActionProps) => <HistoricActionButton {...props} label={props.label || "Save"}/>