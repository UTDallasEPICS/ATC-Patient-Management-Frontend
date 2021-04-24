export enum InputType {
    DATE,
    TEXT
  }
  
  export interface TextInput {
    displayValue: string,
    attributeName: string,
    type: InputType,
  }