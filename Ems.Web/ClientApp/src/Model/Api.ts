export interface IWithId<T> {
  id?:T
}

export interface IEmployee extends IWithId<number>{  
  name: string,
  gradeId: number,
  positionId: number,
  personalCostMultiplier: number,
  employmentDate: Date,
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
  EmployedDayInFuture,
  Available,
  SickLeave,
  Vacation
}