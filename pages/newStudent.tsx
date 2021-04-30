import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";

const newStudent = () => {
  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
    required: true,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
    required: true,
  };

  const birthDateInput: Input = {
    attributeName: "birth_date",
    type: InputType.DATE,
    name: "Birth Date",
    required: true,
  };

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MUTILINE_TEXT,
    name: "Other info",
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
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
        <title>New Student</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Student">
        <div>
          <NewEntity textFields={textInputs} submitFunction={handleSubmit} />
        </div>
      </Navbar>
    </div>
  );
};

export default newStudent;
