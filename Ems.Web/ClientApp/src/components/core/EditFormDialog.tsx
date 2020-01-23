import React from "react";
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

function EditFormDialog(props: IEditDialogProps) {
  let {buttonCaption, children, onCancel, onSave, title} = props;
  return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel}
                     actions={[{label: "Cancel", color: "secondary"}, {label: "Save", action: onSave}]}>
    <React.Fragment>
      {children}
    </React.Fragment>
  </FormDialog>
}

export default connect<any>(
  (state: any) => state.dialogActions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(EditFormDialog);
