import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ButtonGroup, createStyles, makeStyles, Paper, PropTypes, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {History, LocationState} from "history";
import {useHistory} from "react-router";

interface IDialogAction {
  label: string,
  color?: PropTypes.Color,
  action?: () => any,
}

export interface IDialogProps {
  title: string,
  buttonCaption: string,
  parentLink?: string,
  onClose?: () => void
  children?: React.ReactNode,
  actions?: IDialogAction[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height:"100%"
    },
  })
);

const FormDialog = (props: IDialogProps) => {
  const {title, children, actions, parentLink} = props;
  const classes = useStyles();
  const history =useHistory();
  return (
    <Grid item xs={4}>
      <Paper className={classes.root}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            {actions && actions.length > 0 && actions.map(action => {
              const handleAction = async () => {
                console.log("handleAction: " + action.action);
                await action.action?.();
                console.log("parentLink: " + parentLink);
                if (parentLink)
                  history.replace(parentLink);
              };
              return <Button onClick={handleAction} color={action.color || "primary"} variant="outlined">
                {action.label}
              </Button>;
            })}
          </ButtonGroup>
        </DialogActions>
      </Paper>
    </Grid>
  );
};

export default FormDialog;
