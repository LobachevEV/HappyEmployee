import {PropTypes} from "@material-ui/core";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import React from "react";

interface IDialogActionProps {
  id?: string,
  label?: string,
  color: PropTypes.Color,
  invoke?: () => any,
}

interface IHistoricActionProps extends IDialogActionProps {
  to: string;
}

const HistoricActionButton = (props: IHistoricActionProps) => {
  const history = useHistory();
  const {id, to, color, label, invoke} = props;
  const handleAction = async () => {
    await invoke?.();
    history.push(to);
  };
  return <Button id={id} onClick={handleAction} color={color || "primary"} variant="outlined">
    {label}
  </Button>;
}

export const CancelButton = (props: IHistoricActionProps) => <HistoricActionButton
  id={"history-cancel-button"} {...props} label={props.label || "Cancel"}/>
export const SaveButton = (props: IHistoricActionProps) => <HistoricActionButton id={"history-save-button"} {...props}
                                                                                 label={props.label || "Save"}/>