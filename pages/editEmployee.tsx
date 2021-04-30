import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Employee } from "../components/Interfaces/Entities";

const editEmployee = ({ employee }) => {
  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
    required: true,
    value: employee.firstName,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
    required: true,
    value: employee.lastName,
  };

  const birthDateInput: Input = {
    attributeName: "birth_date",
    type: InputType.DATE,
    name: "Birth Date",
    required: true,
    value: employee.dob,
  };

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MUTILINE_TEXT,
    name: "Other info",
    value: employee.otherInfo,
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
    value: employee.phone,
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
    value: employee.email,
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
        <title>Edit Employee</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Edit Employee">
        <div>
          <NewEntity textFields={textInputs} submitFunction={handleSubmit} />
        </div>
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const employee: Employee = {
    id: query.employeeID,
    firstName: "Billy",
    lastName: "Doe",
    dob: "2021-12-08",
    phone: "999-999-9999",
    email: "epics@atc.com",
    otherInfo: "Unable to work on Fridays",
  };

  return {
    props: {
      employee: employee,
    },
  };
};

export default editEmployee;
