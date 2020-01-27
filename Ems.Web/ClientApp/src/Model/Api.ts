export interface IEmployee {
  id?: number,
  name: string,
  gradeId: number,
  positionId: number,
  personalCostMultiplier: number,
}

export interface IGrade {
  id?:number,
  description:string,
  costMultiplier:number
}

export interface IPosition {
  id:string,
  costRate:number
}