import React, {FunctionComponent, useState} from "react";
import FormDialog from "../core/FormDialog";
import {useStore} from "react-redux";
import {useLocation, useParams} from "react-router";
import {CancelButton, SaveButton} from "./HistoricActions";
import {IWithId} from "../../Model/Api";

interface IEditDialogProps {
  buttonCaption: string;
}

export interface IChildComponentProps<T extends IWithId<any>> {
  entityId: any,
  entity: Readonly<T>,
  handleChange: (fieldsToUpdate: Partial<T>) => void,
}

interface IEditDialogConfigs<T extends IWithId<any>> {
  Body: FunctionComponent<IChildComponentProps<T>>,
  getTitle: (entity: T) => string,
  getEntityOrDefault: (state: any, id: any) => T,
  save: (entity: T) => void, 
}

function createEditDialog<T extends IWithId<any>>(cfg: IEditDialogConfigs<T>) {
  const {Body, getEntityOrDefault, save, getTitle} = cfg;
  return (props: IEditDialogProps) => {
    const {id} = useParams();
    const store = useStore();
    const initialState = getEntityOrDefault(store.getState(), id);
    const [entity, setEntity] = useState(initialState);

    const handleChange = (fieldsToUpdate: Partial<T>) => {
      const newEntity = {...entity, ...fieldsToUpdate}
      setEntity(newEntity);
    }

    const onSave = () => save(entity);

    const regex = new RegExp("(\\/" + id + ")$");
    const parentLink = useLocation().pathname.replace(regex, '');
    const title = getTitle(entity);
    return <FormDialog {...props}
                       title={title}
                       actions={[<CancelButton color={"secondary"} to={parentLink}/>,
                         <SaveButton color={"primary"} to={parentLink} invoke={onSave}/>]}>
      <React.Fragment>
        <Body entityId={id} entity={entity} handleChange={handleChange}/>
      </React.Fragment>
    </FormDialog>
  };
}

export default createEditDialog;
