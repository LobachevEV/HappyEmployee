import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import FormDialog from "../core/FormDialog";
import {actionCreators} from "../../store/Employees";


interface IEditDialogProps {
  title: string
  buttonCaption: string,
  children?: React.ReactNode
  onCancel?: () => void
  onSave: () => void
}

class EditFormDialog extends Component<IEditDialogProps> {
  
  render() {    
    let {buttonCaption, children, onCancel, onSave, title} = this.props;

    function handleSave() {
      onSave();
    }

    function handleCancel() {
      onCancel?.();
    }

    return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel}>
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
