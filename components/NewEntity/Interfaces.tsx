export enum InputType {
    DATE,
    TEXT
  }
  
  export interface Input {
    attributeName: string,
    type: InputType,
    name?: string,
    defaultValue?: string,
  }