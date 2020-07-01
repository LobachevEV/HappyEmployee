import React, {FunctionComponent, useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {actionCreators} from "../../store/Employees";
import {Link, useParams} from "react-router-dom";
import {IEmployee, IGrade, IPosition} from "../../Model/Api";
import RichTable, {IColumn} from "../core/RichTable";
import {History, LocationState} from "history";
import {actionCreators as gradesActionCreators} from "../../store/Grades";
import {actionCreators as positionsActionCreators} from "../../store/Positions";
import moment from "moment";

interface IEmployeesPageProps {
  items: Array<IEmployee>,
  total: number,
  startIndex: number,
  rowsPerPage: number,
  requestEmployees: (startIndex: number, rowsPerPage: number) => IEmployee[],
  removeEmployee: (id: number) => IEmployee[],
  history: History<LocationState>
}

const Employees: FunctionComponent<IEmployeesPageProps> = (props: IEmployeesPageProps) => {
  const {requestEmployees, removeEmployee, items, history} = props;
  const {startIndex, rowsPerPage} = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gradesActionCreators.requestGrades());
    dispatch(positionsActionCreators.requestPositions());
  }, [1])
  useEffect(() => {
    const startIndexInt = startIndex && parseInt(startIndex, 10) || 0;
    const rowsPerPageInt = rowsPerPage && parseInt(rowsPerPage, 10) || 5;
    requestEmployees(startIndexInt, rowsPerPageInt);
  }, [startIndex, rowsPerPage]);

  const positions = useSelector((state: any) => state.positions.items).reduce((map: Map<number, string>, p: IPosition) => {
    if (!p.id) return map;
    return map.set(p.id, p.title);
  }, new Map<number, string>());
  const grades = useSelector((state: any) => state.grades.items).reduce((map: Map<number, string>, g: IGrade) => {
    if (!g.id) return map;
    return map.set(g.id, g.description);
  }, new Map<number, string>());
  const columns: IColumn[] = [
    {title: "Id", format: (item) => item.id},
    {title: "Name", format: (item) => item.name},
    {title: "Grade", format: (item) => grades.get(item.gradeId)},
    {title: "Position", format: (item) => positions.get(item.positionId)},
    {title: "Personal Cost Multiplier", format: (item) => item.personalCostMultiplier},
    {title: "Employment Date", format: (item) => moment(item.employmentDate).format('L')},
  ];

  return (
    <RichTable title={"Employees"} columns={columns} items={items} onEditRow={handleEditRow}
               onDeleteRow={item => removeEmployee(item.id)}
               deleteConfirmationMessage={(employee: IEmployee) => `Confirm deleting the Employee ${employee.name}`}
               actions={[<Button component={Link} to={{pathname: "/employees/0"}} color="primary" variant="outlined">
                 Add Employee
               </Button>]}/>
  );

  function handleEditRow(item: any) {
    history.push(`/employees/${item.id || 0}`);
  }
};

export default connect<any>(
  (state: any) => state.employees,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Employees);
