import React, {FunctionComponent, useEffect, useReducer} from "react";
import FormDialog from "../core/FormDialog";
import {useStore} from "react-redux";
import {useLocation, useParams} from "react-router";
import {CancelButton, SaveButton} from "./HistoricActions";

interface IEditDialogProps {
}

export interface IChildComponentProps {
  entityId: any,
  entity: any,
  handleChange: (event: any) => void,
}

interface IEditDialogConfigs {
  ChildComponent: FunctionComponent<IChildComponentProps>,
  entityName: string,
  getTitle: (entity: any) => string,
  getById: (state: any, id: any) => any,
  save: (entity: any) => void
}

const createEditDialog = (cfg: IEditDialogConfigs) => (props: IEditDialogProps) => {
  const {ChildComponent, getById, save, getTitle, entityName} = cfg;
  const [entity, dispatchLocal] = useReducer((state: any, {type, value}: any) => {
      switch (type) {
        case "SET_ENTITY":
          return value as any;
        case "UPDATE_PROP":
          return {
            ...state,
            [value.name]: value.value
          } as any
      }
      return state;
    },
    {} as any);

  const {id} = useParams();
  const store = useStore();
  useEffect(() => {
    const entity = getById(store.getState(), id);
    dispatchLocal({type: "SET_ENTITY", value: entity});
  }, [id]);

  const handleChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // @ts-ignore
    dispatchLocal({type: "UPDATE_PROP", value: {name, value}});
  };

  const onSave = () => save(entity);

  const regex = new RegExp("(\\/" + id + ")$");
  const parentLink = useLocation().pathname.replace(regex, '');
  return <FormDialog {...props}                     
                     title={getTitle(entity) ?? `New ${entityName}`}
                     buttonCaption={`Add ${entityName}`}
                     actions={[<CancelButton color={"secondary"} to={parentLink}/>, <SaveButton color={"primary"} to={parentLink} invoke={onSave}/>]}>
    <React.Fragment>
      <ChildComponent entityId={id} entity={entity} handleChange={handleChange}/>
    </React.Fragment>
  </FormDialog>
};

// const EditFormDialog = (props: IEditDialogProps) => {
//   let {buttonCaption, children, onCancel, onSave, title, history, parentLink} = props;
//   return <FormDialog title={title} buttonCaption={buttonCaption} onClose={onCancel}
//                      actions={[{label: "Cancel", color: "secondary"}, {label: "Save", action: onSave}]}
//                      history={history} parentLink={parentLink}>
//     <React.Fragment>
//       {children}
//     </React.Fragment>
//   </FormDialog>
// };

export default createEditDialog;
