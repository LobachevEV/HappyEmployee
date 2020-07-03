import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IAlertDialogProps {
  message: string,
  onClose(): void,
  onSubmit(): void,
}

const ConfirmationDialog = (props: IAlertDialogProps) => {
  const {onSubmit, onClose} = props;
  const handleOk = () => {

    onSubmit()
    onClose()
  }
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Decline
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;