import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";

const newEmployee = () => {
  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
  };

  const birthDateInput: Input = {
    attributeName: "birth_date",
    type: InputType.DATE,
    name: "Birth Date",
  };

  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    birthDateInput,
  ];

  return (
    <div>
      <Head>
        <title>New Employee</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Employee">
        <div>
          <NewEntity textFields={textInputs} apiURL="TODO/newEmployee" />
        </div>
      </Navbar>
    </div>
  );
};

export default newEmployee;
