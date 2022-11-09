import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { Patient } from "../interfaces/Patient";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const newStudent = () => {
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

    const parentPhoneInput: Input = {
        attributeName: "parent_phone",
        type: InputType.TEXT,
        name: "Parent Phone Number",
    };

    const emailInput: Input = {
        attributeName: "email",
        type: InputType.TEXT,
        name: "Email address",
    };

    const parentEmailInput: Input = {
        attributeName: "parent_email",
        type: InputType.TEXT,
        name: "Parent email address",
    };

    const textInputs: Input[] = [
        firstNameInput,
        lastNameInput,
        birthDateInput,
        emailInput,
        parentPhoneInput,
        parentEmailInput,
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
        const [firstName, lastName, birthday, email, parentPhone, parentEmail] =
            fields.map((field) => field.value || "");

        const newUser: Patient = {
            firstName,
            lastName,
            birthday: convertStringToDate(birthday),
            email,
            parentPhone,
            parentEmail,
        };

        await fetch("http://localhost:8080/patient/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        router.push("/studentSearch");
    };

    return (
        <div>
            <Head>
                <title>New Student</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="New Student">
                <Link href="/studentSearch">
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

export default newStudent;
