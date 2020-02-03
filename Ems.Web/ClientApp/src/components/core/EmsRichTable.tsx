import RichTable, {IColumn} from "./RichTable";
import React from "react";
import {History, LocationState} from "history";
import {WithId} from "../../Model/Api";

interface IEmsRichTableProps {
  resource: string,
  columns: IColumn[],
  items: Array<WithId<any>>,
  request: (newStartIndex: number, rowsPerPage: number) => any[],
  history: History<LocationState>
  actions?: React.ReactNode[]
}

const EmsRichTable = (props: IEmsRichTableProps) => {
  const {resource, items, columns, actions, history} = props;
  const handleEditRow = (item: any) => {
    history.push(`/${resource}/${item.id || 0}`);
  };
  return (
    <RichTable columns={columns} items={items} onEditRow={handleEditRow} actions={actions}/>)
};

export default EmsRichTable;