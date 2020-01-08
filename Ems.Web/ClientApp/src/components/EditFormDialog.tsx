import FormDialog from "./core/FormDialog";
import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/DialogActions";

interface IEditDialogProps {
  title: string
  buttonCaption: string,
  open?: boolean,
  children?: React.ReactNode
  onCancel: () => void
  onSave: () => void
  close?: () => void
}

class EditFormDialog extends Component<IEditDialogProps> {
  
  render() {    
    let {buttonCaption, children, close, onCancel, onSave, open, title} = this.props;

    function handleSave() {
      onSave();
      close && close()
    }

    function handleCancel() {
      onCancel();
      close && close()
    }

    return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel} open={open} actions={
      [
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>,
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      ]
    }>
      <React.Fragment>
        {children}
      </React.Fragment>
    </FormDialog>
  }
}

export default connect<any>(
  (state: any) => state.dialogActions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(EditFormDialog);
