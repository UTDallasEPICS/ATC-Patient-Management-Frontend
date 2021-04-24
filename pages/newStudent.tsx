import  NewEntity  from "../components/NewEntity/NewEntity";
import {StringInput, InputType} from "../components/NewEntity/Interfaces"

const newStudent = () => {
  const firstNameInput: StringInput = {
    value: "First Name...",
    attributeName: "first_name",
    type: InputType.TEXT
  };

  const lastNameInput: StringInput = {
    value: "Last Name...",
    attributeName: "last_name",
    type: InputType.TEXT
  };

  const birthDateInput: StringInput = {
    value: "2017-05-24",
    attributeName: "birth_date",
    type: InputType.DATE
  };

  const textInputs: StringInput[] = [firstNameInput, lastNameInput, birthDateInput]

  return (
    <div>
      <NewEntity textFields={textInputs} />
    </div>
  );
};

export default newStudent;
