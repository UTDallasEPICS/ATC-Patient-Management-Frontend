export enum InputType {
    DATE,
    TEXT
  }
  
  export interface StringInput {
    attributeName: string,
    type: InputType,
    name?: string,
    defaultValue?: string,
  }