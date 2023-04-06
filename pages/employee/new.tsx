import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { Employee } from "../../interfaces/Employee";
import { useRouter } from "next/router";
import CheckUser  from '../../auth0CheckUser';

const newEmployee = () => {
  // Verifies if user has the correct permissions
  if(!CheckUser()) return(<div>Redirecting...</div>);

  const router = useRouter();
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

  const convertStringToDate = (date: string) => {
    const data = date.split("-");
    return new Date(
        parseInt(data[0]),
        parseInt(data[1]) - 1,
        parseInt(data[2])
    );
  };

  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    birthDateInput,
    phoneNumberInput,
    emailInput,
    otherInfoInput,
  ];

  const handleSubmit = async (fields: Input[]) => {
    /*
    console.log(
      "handleSubmit: " +
        fields.map((field) => {
          return field.name + ": " + field.value;
        })

    );
    */
    const [firstName, lastName, birthday, phoneNumber, email, otherInfo] =
            fields.map((field) => field.value || "");

    const newUser: Employee = {
      firstName,
      lastName,
      birthday: convertStringToDate(birthday),
      phoneNumber,
      email,
      otherInfo,
    };
    await fetch("http://localhost:8080/therapist/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        router.push("/employeeSearch");
  };
  


  return (
    <div>
      <Head>
        <title>New Employee</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Employee">   
          <Link href="/employeeSearch">
                <Button className="primaryButton">Go Back</Button>
          </Link>         
                <div>
                    <NewEntity
                        textFields={[...textInputs]}
                        submitFunction={handleSubmit}
                    />
                </div>
            </Navbar>
    </div>
  );
};

export default newEmployee;
