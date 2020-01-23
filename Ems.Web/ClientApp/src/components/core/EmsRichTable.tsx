import RichTable, {IColumn} from "./RichTable";
import React from "react";
import {History, LocationState} from "history";

interface IEmsRichTableProps {
  resource: string,
  columns: IColumn[],
  items: Array<any>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  request: (newStartIndex: number, rowsPerPage: number) => any[],
  history: History<LocationState>
  actions?: React.ReactNode[]
}

const EmsRichTable = (props: IEmsRichTableProps) => {
  const {startIndex, resource, items, rowsPerPage, columns, total, actions} = props;
  return (
    <RichTable columns={columns} items={items} total={total}
               page={(startIndex || 0) / rowsPerPage}
               rowsPerPage={(rowsPerPage || 5)}
               onChangePage={(e, newPage) => {
                 const newStartIndex = Math.max(newPage, 0) * props.rowsPerPage;
                 props.request(newStartIndex, props.rowsPerPage);
                 props.history.push(`/${resource}/${newStartIndex}/${props.rowsPerPage}`);
               }}
               onChangeRowsPage={newRowsPerPage => {
                 const newStartIndex = 0;
                 props.request(newStartIndex, newRowsPerPage);
                 props.history.push(`/${resource}/${newStartIndex}/${newRowsPerPage}`);
               }}
               actions={actions}/>
  )
};

export default EmsRichTable;