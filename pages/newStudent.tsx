import  NewEntity  from "../components/NewEntity/NewEntity";
import {TextInput, InputType} from "../components/NewEntity/Interfaces"

const newStudent = () => {
  const firstNameInput: TextInput = {
    displayValue: "First Name...",
    attributeName: "first_name",
    type: InputType.TEXT
  };

  const lastNameInput: TextInput = {
    displayValue: "Last Name...",
    attributeName: "last_name",
    type: InputType.TEXT
  };

  const birthDateInput: TextInput = {
    displayValue: "Last Name...",
    attributeName: "last_name",
    type: InputType.DATE
  };

  const textInputs: TextInput[] = [firstNameInput, lastNameInput, birthDateInput]

  return (
    <div>
      <NewEntity textFields={textInputs} />
    </div>
  );
};

export default newStudent;
