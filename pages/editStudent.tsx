import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Student } from "../components/Interfaces/Entities";
import newStudent from "./newStudent";

const editStudent = (props: { student: Student }) => {
  const { student } = props;

  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
    required: true,
    value: student.firstName,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
    required: true,
    value: student.lastName,
  };

  const birthDateInput: Input = {
    attributeName: "birth_date",
    type: InputType.DATE,
    name: "Birth Date",
    required: true,
    value: student.dob,
  };

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MUTILINE_TEXT,
    name: "Other info",
    value: student.otherInfo,
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
    value: student.phone,
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
    value: student.email,
  };

  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    birthDateInput,
    phoneNumberInput,
    emailInput,
    otherInfoInput,
  ];

  const handleSubmit = (fields: Input[]) => {
    console.log(
      "handleSubmit: " +
        fields.map((field) => {
          return field.name + ": " + field.value;
        })
    );
  };

  return (
    <div>
      <Head>
        <title>Edit Student</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Edit Student">
        <div>
          <NewEntity textFields={textInputs} submitFunction={handleSubmit} />
        </div>
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const student: Student = {
    id: query.studentID,
    firstName: "Billy",
    lastName: "Doe",
    dob: "2021-12-08",
    phone: "999-999-9999",
    email: "epics@atc.com",
    otherInfo: "Parent Phone: 828-902-2828",
  };

  return {
    props: {
      student: student,
    },
  };
};

export default editStudent;
