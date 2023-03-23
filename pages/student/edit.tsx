import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { Patient } from "../../interfaces/Patient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

type PatientWithIdAndImg = Patient & { id: string; img: string };

const editStudent = (props: { student: PatientWithIdAndImg }) => {
    const { student } = props;
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
        value: student.firstName,
    };

    const lastNameInput: Input = {
        attributeName: "last_name",
        name: "Last Name",
        type: InputType.TEXT,
        required: true,
        value: student.lastName,
    };

    const birthDateInput: Input = {
        attributeName: "birth_date",
        type: InputType.DATE,
        name: "Birth Date",
        required: true,
        value: formatDate(student.birthday),
    };

    const parentPhoneInput: Input = {
        attributeName: "parent_phone",
        type: InputType.TEXT,
        name: "Parent Phone Number",
        value: student.parentPhone,
    };

    const emailInput: Input = {
        attributeName: "email",
        type: InputType.TEXT,
        name: "Email address",
        value: student.email,
    };

    const parentEmailInput: Input = {
        attributeName: "parentEmail",
        type: InputType.TEXT,
        name: "Parent Email Address",
        value: student.parentEmail,
    };

    const textInputs: Input[] = [
        firstNameInput,
        lastNameInput,
        birthDateInput,
        parentPhoneInput,
        emailInput,
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
        const [firstName, lastName, birthday, parentPhone, email, parentEmail] =
            fields.map((field) => field.value || "");

        try {
            await fetch(`http://localhost:8080/patient/${student.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    birthday: convertStringToDate(birthday),
                    email,
                    parentPhone,
                    parentEmail,
                }),
            });
            router.push("/studentSearch");
        } catch (error) {
            console.log("Failed to update profile! Please try again later");
            console.error(error);
        }
    };

    return (
        <div>
            <Head>
                <title>Edit Student</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="Edit Student">
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
    if (!query.studentID) {
        return {
            notFound: true,
        };
    }
    const temp = await fetch(
        `http://localhost:8080/patient/${query.studentID}`,
        {
            method: "GET",
        }
    );
    const { data } = await temp.json();
    const student: PatientWithIdAndImg = {
        id: query.studentID as string,
        firstName: data.firstName,
        lastName: data.lastName,
        img: "",
        birthday: data.birthday,
        parentPhone: data.parentPhone,
        email: data.email,
        parentEmail: data.parentEmail,
    };
    return {
        props: {
            student,
        },
    };
};

export default editStudent;
