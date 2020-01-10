import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";

interface IBladeProps {
  title: string  
  onClose: () => any
  children?: React.ReactNode
  actions?: React.ReactNode[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}
  }),
);

const Blade = (props: IBladeProps) => {
  const {actions, title, children} = props;
  return (
    <div>
      <Grid xs={12}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        {actions && actions.length > 0 && <DialogActions>
          {actions}
        </DialogActions>}
      </Grid>
    </div>
  );
};

export default Blade;
