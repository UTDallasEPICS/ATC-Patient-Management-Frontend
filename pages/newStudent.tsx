import NewEntity from "../components/NewEntity/NewEntity";
import { StringInput, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";

const newStudent = () => {
  const firstNameInput: StringInput = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
  };

  const lastNameInput: StringInput = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
  };

  const birthDateInput: StringInput = {
    attributeName: "birth_date",
    type: InputType.DATE,
    name: "Birth Date",
  };

  const textInputs: StringInput[] = [
    firstNameInput,
    lastNameInput,
    birthDateInput,
  ];

  return (
    <div>
      <Head>
        <title>New Student</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Student">
        <div>
          <NewEntity textFields={textInputs} />
        </div>
      </Navbar>
    </div>
  );
};

export default newStudent;
