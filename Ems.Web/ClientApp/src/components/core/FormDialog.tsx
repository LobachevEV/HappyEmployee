import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ButtonGroup, createStyles, Dialog, makeStyles, Paper, Theme} from "@material-ui/core";

export interface IDialogProps {
  title: string,
  buttonCaption: string,  
  onClose?: () => void
  children?: React.ReactNode,
  actions?: React.ReactNode[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
  })
);

const FormDialog = (props: IDialogProps) => {
  const {title, children, actions} = props;
  const classes = useStyles();
  return (
    <Dialog open={true}>      
        <Paper className={classes.root}>
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <ButtonGroup>
              {actions}
            </ButtonGroup>
          </DialogActions>
        </Paper>
    </Dialog>
  );
};

export default FormDialog;
