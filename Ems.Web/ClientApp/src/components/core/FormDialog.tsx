import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IDialogAction {
  label: string,
  action?: () => any
}

interface IDialogProps {
  title: string
  buttonCaption: string,
  onClose?: () => void
  children?: React.ReactNode,
  actions?: IDialogAction[]
}

const FormDialog = (props: IDialogProps) => {
  const [open, setOpen] = React.useState(false);
  console.log("FormDialog open is " + open);

  function handleClickOpen() {
    setOpen(true);
  }

  const {buttonCaption, onClose, title, children, actions} = props;

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
          {actions && actions.length > 0 && actions.map(action => {
            const handleAction = () => {
              action.action?.();
              setOpen(false);
            };
            return <Button onClick={handleAction} color="primary">
              {action.label}
            </Button>;
          })}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
