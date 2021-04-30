export interface Program {

}

export interface Student {
    firstName: string,
    lastName: string,
    id: string,
    dob: string,
    phone?: string,
    email?:string,
    otherInfo?: string,
    program?: Program,
    img?: ImageBitmap,
  }

export interface Employee {
  firstName: string,
  lastName: string,
  id: string,
  dob: string,
  phone?: string,
  email?:string,
  otherInfo?: string,
  program?: Program,
  img?: ImageBitmap,
}