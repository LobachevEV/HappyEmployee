import FormDialog from "./core/FormDialog";
import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/BladeActions";

interface IEditDialogProps {
  title: string
  buttonCaption: string,
  children?: React.ReactNode
  onCancel: () => void
  onSave: () => void
}

class EditFormDialog extends Component<IEditDialogProps> {
  
  render() {    
    let {buttonCaption, children, onCancel, onSave, title} = this.props;

    function handleSave() {
      onSave();
    }

    function handleCancel() {
      onCancel();
    }

    return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel} actions={
      [
       
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
