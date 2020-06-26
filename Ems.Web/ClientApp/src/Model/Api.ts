export interface WithId<T> {
  id?:T
}

export interface IEmployee extends WithId<number>{  
  name: string,
  gradeId: number,
  positionId: number,
  personalCostMultiplier: number,
  employmentDate: Date,
}

export interface IGrade extends WithId<number>{  
  description:string,
  costMultiplier:number
}

export interface IPosition extends WithId<string>{  
  costRate:number
}