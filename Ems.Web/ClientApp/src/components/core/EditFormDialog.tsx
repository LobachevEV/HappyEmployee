import React, {FunctionComponent, useEffect, useReducer} from "react";
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

  getTitle(entity: T): string,

  getById(state: any, id: any): T,

  save(entity: T): void,

  setDefault?(): T
}

function createEditDialog<T>(cfg: IEditDialogConfigs<T>) {
  return (props: IEditDialogProps) => {
    const {ChildComponent, getById, save, getTitle, entityName, setDefault} = cfg;
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
      setDefault ? setDefault() : {} as T);

    const {id} = useParams();
    const store = useStore();
    if (id && id != "0") {
      useEffect(() => {
        const entity = getById(store.getState(), id);
        dispatchLocal({type: "SET_ENTITY", value: entity});
      }, [id]);
    }

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
};

export default createEditDialog;
