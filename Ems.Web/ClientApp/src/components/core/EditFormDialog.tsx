import React, {FunctionComponent, useReducer} from "react";
import FormDialog from "../core/FormDialog";
import {useStore} from "react-redux";
import {useLocation, useParams} from "react-router";
import {CancelButton, SaveButton} from "./HistoricActions";
import {IWithId} from "../../Model/Api";

interface IEditDialogProps {
}

export interface IChildComponentProps<T extends IWithId<any>> {
  entityId: any,
  entity: T,
  handleChange: (event: any) => void,
}

interface IEditDialogConfigs<T extends IWithId<any>> {
  ChildComponent: FunctionComponent<IChildComponentProps<T>>,
  entityName: string,
  getTitle: (entity: T) => string,
  getItemOrDefault:(state: any, id: any)=> T,
  save: (entity: T) => void,
}

function createEditDialog<T>(cfg: IEditDialogConfigs<T>) {
  const {ChildComponent, getItemOrDefault, save, getTitle, entityName} = cfg;
  return (props: IEditDialogProps) => {

    const {id} = useParams();
    const store = useStore();
    const [entity, dispatchLocal] = useReducer((state: any, {type, value}: any) => {
        switch (type) {
          case "SET_ENTITY":
            return value as T;
          case "UPDATE_PROP":
            return {
              ...state,
              [value.name]: value.value
            } as any
        }
        return state;
      },
      getItemOrDefault(store.getState(), id));

    const handleChange = (event: any) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      dispatchLocal({type: "UPDATE_PROP", value: {name, value}});
    };

    const onSave = () => save(entity);

    const regex = new RegExp("(\\/" + id + ")$");
    const parentLink = useLocation().pathname.replace(regex, '');
    return <FormDialog {...props}
                       title={getTitle(entity) ?? `New ${entityName}`}
                       buttonCaption={`Add ${entityName}`}
                       actions={[<CancelButton color={"secondary"} to={parentLink}/>,
                         <SaveButton color={"primary"} to={parentLink} invoke={onSave}/>]}>
      <React.Fragment>
        <ChildComponent entityId={id} entity={entity} handleChange={handleChange}/>
      </React.Fragment>
    </FormDialog>
  };
}

export default createEditDialog;
