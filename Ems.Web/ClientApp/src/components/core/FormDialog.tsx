import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IDialogProps {
  title: string
  buttonCaption: string,
  open?: boolean,
  onClose: () => void
  children?: React.ReactNode
  actions?: React.ReactNode[]
}

const FormDialog = (props: IDialogProps) => {
  const [open, setOpen] = React.useState(!!props.open);
  console.log("FormDialog open is " + open);

  function handleClickOpen() {
    setOpen(true);
  }

  const {buttonCaption, onClose, actions, title, children} = props;

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonCaption}
      </Button>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
