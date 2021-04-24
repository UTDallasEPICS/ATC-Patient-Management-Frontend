export enum InputType {
    DATE,
    TEXT
  }
  
  export interface StringInput {
    value: string,
    attributeName: string,
    type: InputType,
    name?: string,
  }