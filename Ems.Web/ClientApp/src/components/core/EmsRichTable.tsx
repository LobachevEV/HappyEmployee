import RichTable, {IColumn} from "./RichTable";
import React from "react";
import {History, LocationState} from "history";
import {WithId} from "../../Model/Api";

interface IEmsRichTableProps {
  resource: string,
  columns: IColumn[],
  items: Array<WithId<any>>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  request: (newStartIndex: number, rowsPerPage: number) => any[],
  history: History<LocationState>
  actions?: React.ReactNode[]
}

const EmsRichTable = (props: IEmsRichTableProps) => {
  const {startIndex, resource, items, rowsPerPage, columns, total, actions, request, history} = props;
  const handleChangePage = (e: any, newPage: number) => {
    const newStartIndex = Math.max(newPage, 0) * props.rowsPerPage;
    request(newStartIndex, props.rowsPerPage);
    history.push(`/${resource}/${newStartIndex}/${props.rowsPerPage}`);
  };
  const handleChangeRowsPage = (newRowsPerPage: number) => {
    const newStartIndex = 0;
    request(newStartIndex, newRowsPerPage);
    history.push(`/${resource}/${newStartIndex}/${newRowsPerPage}`);
  };
  const handleEditRow = (item:any)=>{
    history.push(`/${resource}/${item.id || 0}`);
  };
  return (
    <RichTable columns={columns} items={items} total={total}
               page={(startIndex || 0) / rowsPerPage}
               rowsPerPage={(rowsPerPage || 5)}
               onChangePage={handleChangePage}
               onChangeRowsPage={handleChangeRowsPage}
               onEditRow={handleEditRow}
               actions={actions}/>
  )
};

export default EmsRichTable;