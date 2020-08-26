import React, {FunctionComponent, useState} from "react";
import {createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import createEditDialog, {IChildComponentProps} from "../core/EditFormDialog";
import SelectCmp from "../core/SelectCmp";
import {EmployeeAvailability, employeeAvailabilityToString, IEmployee, IGrade, IPosition} from "../../Model/Api";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators} from "../../store/Employees";
import {DatePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from '@material-ui/icons/Assignment';
import moment from "moment";
import RadioButtonGroupCmp, {IRadioButton} from "../core/RadioButtonGroupCmp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeAvatar: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  }),
);


interface IEmployeeEditDialog extends IChildComponentProps<IEmployee> {
}

const BodyCmp: FunctionComponent<IEmployeeEditDialog> = (props) => {
  const employee = props.entity;
  const {handleChange} = props;

  const [employmentDateInFuture, setEmploymentDateInFuture] = useState(() => {
    if (employee.employmentDate)
      return moment(employee.employmentDate).isAfter();
    else
      return false;
  });

  const handleEmploymentDateChange = (pickerDate: MaterialUiPickersDate) => {
    const date = pickerDate?.toDate();
    const inFuture = moment(date).isAfter();
    setEmploymentDateInFuture(inFuture)
    const fieldsToUpdate: Partial<IEmployee> = {
      employmentDate: date
    };
    if (employmentDateInFuture != inFuture)
      fieldsToUpdate.availability = inFuture ? EmployeeAvailability.willStartWorkSoon : EmployeeAvailability.available;
    handleChange(fieldsToUpdate);

  }

  const positions = useSelector((state: any) => state.positions.items);
  const grades = useSelector((state: any) => state.grades.items);
  const classes = useStyles();
  const radioButtons: IRadioButton[] = [
    {
      value: EmployeeAvailability.willStartWorkSoon,
      label: employeeAvailabilityToString(EmployeeAvailability.willStartWorkSoon),
      disabled: !employmentDateInFuture
    },
    {
      value: EmployeeAvailability.available,
      label: employeeAvailabilityToString(EmployeeAvailability.available),
      disabled: employmentDateInFuture
    },
    {
      value: EmployeeAvailability.sickLeave,
      label: employeeAvailabilityToString(EmployeeAvailability.sickLeave),
      disabled: employmentDateInFuture
    },
    {
      value: EmployeeAvailability.vacation,
      label: employeeAvailabilityToString(EmployeeAvailability.vacation),
      disabled: employmentDateInFuture
    },
  ];
  return <Grid container spacing={2}>
    <Grid item container xs={12}>
      <Grid item xs={3}>
        <Avatar variant="rounded" className={classes.largeAvatar}>
          <AssignmentIcon/>
        </Avatar>
      </Grid>
      <Grid item container xs={9} spacing={2}>
        <Grid item xs={12}>
          <TextField id="emp_name" label="Employee name" value={employee.name}
                     onChange={event => handleChange({name: event.target.value})}/>
        </Grid>
        <Grid item xs={12}>
          <RadioButtonGroupCmp name="availability" value={employee.availability}
                               onChange={event => handleChange({availability: +event.target.value})}
                               buttons={radioButtons}/>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"position_id"} label="Position"
                 onChange={event => handleChange({positionId: event.target.value as number})}
                 value={employee.positionId}
                 items={positions.map((p: IPosition) => ({value: p.id, label: p.title}))}/>
    </Grid>
    <Grid item xs={6}>
      <SelectCmp id={"grade_id"} label="Grade"
                 onChange={event => handleChange({gradeId: event.target.value as number})}
                 value={employee.gradeId}
                 items={grades.map((g: IGrade) => ({value: g.id, label: g.description}))}/>
    </Grid>
    <Grid item xs={6}>
      <TextField id="per_cost_mult" type="number" InputProps={{inputProps: {step: 0.1}}}
                 label="Personal cost multiplier"
                 onChange={event => handleChange({personalCostMultiplier: +event.target.value})}
                 value={employee.personalCostMultiplier} InputLabelProps={{shrink: true,}}/>
    </Grid>
    <Grid item xs={6}>
      <DatePicker id="employment_date" type="text"
                  label="Employment date" onChange={handleEmploymentDateChange}
                  value={employee.employmentDate} InputLabelProps={{shrink: true,}}/>
    </Grid>
  </Grid>;
};

const EmployeeEditDialog: FunctionComponent = () => {
  const dispatch = useDispatch();
  const getEntityOrDefault = (state: any, id: any) => {
    const employee = state.employees.items.find((item: IEmployee) => item.id === (parseInt(id, 10)));
    return employee ?? {
      name: "",
      gradeId: 1,
      positionId: 1,
      personalCostMultiplier: 1,
      employmentDate: new Date(),
      availability: EmployeeAvailability.available
    }
  };
  const EditDialog = createEditDialog<IEmployee>({
    Body: BodyCmp,
    save: entity => dispatch(actionCreators.saveEmployee(entity)),
    getTitle: entity => entity.name || "New Employee",
    getEntityOrDefault: getEntityOrDefault,
  });
  return <EditDialog buttonCaption={"Add new Employee"}/>
};


export default EmployeeEditDialog;