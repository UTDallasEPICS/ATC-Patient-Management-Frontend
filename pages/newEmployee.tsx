import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";

const newEmployee = () => {
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

  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    birthDateInput,
    otherInfoInput,
  ];

  const handleSubmit = (fields: Input[]) => {
    console.log( "handleSubmit: " +
      fields.map((field) => {
        return field.name + ": " + field.value;
      })
    );
  };

  return (
    <div>
      <Head>
        <title>New Employee</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Employee">
        <div>
          <NewEntity textFields={textInputs} submitFunction={handleSubmit} />
        </div>
      </Navbar>
    </div>
  );
};

export default newEmployee;
