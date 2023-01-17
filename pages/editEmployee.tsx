import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Employee } from "../components/Interfaces/Entities";
import { useRouter } from "next/router";

type EmployeeWithIdAndImg = Employee & { id: string; img: string };

const editEmployee = (props: { employee: EmployeeWithIdAndImg }) => {
  const { employee } = props;
  const router = useRouter();

  const formatDate = (d) => {
      d = new Date(d);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };
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
    value: formatDate(employee.dob),
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
    value: employee.phoneNumber,
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

  const convertStringToDate = (date: string) => {
    const data = date.split("-");
    return new Date(
        parseInt(data[0]),
        parseInt(data[1]) - 1,
        parseInt(data[2])
    );
  };

  const handleSubmit = async (fields: Input[]) => {
    const [firstName, lastName, dob, phoneNumber, email, otherInfo] =
        fields.map((field) => field.value || "");

    try {
        await fetch(`http://localhost:8080/therapist/${employee.id}`, {
            method: "patch",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                dob: convertStringToDate(dob),
                email,
                phoneNumber,
                otherInfo,
            }),
        });
        router.push("/employeeSearch");
    } catch (error) {
        console.log("Failed to update profile! Please try again later");
        console.error(error);
    }
};

return (
    <div>
        <Head>
            <title>Edit Employee</title>
            <link rel="icon" href="/atc-logo.png" />
        </Head>

        <Navbar pageTitle="Edit Employee">
            <div>
                <NewEntity
                    textFields={textInputs}
                    submitFunction={handleSubmit}
                />
            </div>
        </Navbar>
    </div>
);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
    if (!query.employeeID) {
        return {
            notFound: true,
        };
    }
    const temp = await fetch(
        `http://localhost:8080/therapist/${query.employeeID}`,
        {
            method: "get",
        }
    );
  const { data } = await temp.json();
  const employee: Employee = {
    id: query.employeeID as string,
    firstName: data.firstName,
    lastName: data.lastName,
    dob: data.birthday,
    phone: data.phoneNumber,
    email: data.email,
    otherInfo: data.otherInfo,
  };

  return {
    props: {
      employee: employee,
    },
  };
};

export default editEmployee;
