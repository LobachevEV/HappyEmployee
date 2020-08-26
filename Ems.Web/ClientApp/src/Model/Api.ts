export interface IWithId<T> {
  id?:T
}

export interface IEmployee extends IWithId<number>{  
  name: string,
  gradeId: number,
  positionId: number,
  personalCostMultiplier: number,
  employmentDate: Date,
  availability: EmployeeAvailability
}

export interface IGrade extends IWithId<number>{  
  description:string,
  costMultiplier:number
}

export interface IPosition extends IWithId<number>{
  title:string,
  costRate:number
}

export enum EmployeeAvailability  {
  willStartWorkSoon,
  available,
  sickLeave,
  vacation
}

export function employeeAvailabilityToString(availability: EmployeeAvailability): string{
  switch (availability){
    case EmployeeAvailability.willStartWorkSoon:
      return "Will start work soon";
    case EmployeeAvailability.available:
      return "Available";
    case EmployeeAvailability.sickLeave:
      return "Sick leave";
    case EmployeeAvailability.vacation:
      return "Vacation";

  }
}