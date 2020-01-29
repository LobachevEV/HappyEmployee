import React from "react";
import FormDialog from "../core/FormDialog";

interface IEditDialogProps {
  title: string
  buttonCaption: string,
  children?: React.ReactNode
  onCancel?: () => void
  onSave: () => void
}

const EditFormDialog = (props: IEditDialogProps) => {
  let {buttonCaption, children, onCancel, onSave, title} = props;
  return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel}
                     actions={[{label: "Cancel", color: "secondary"}, {label: "Save", action: onSave}]}>
    <React.Fragment>
      {children}
    </React.Fragment>
  </FormDialog>
};

export default EditFormDialog;
