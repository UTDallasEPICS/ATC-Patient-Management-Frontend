import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "../styles/NewStudent.module.css";
import Link from "next/link";
import Avatar from "../components/Avatar";
import { useForm } from "react-hook-form";

export default function newStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [otherInfo, setOtherInfo] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    //here is where the POST request will happen
  };

  return (
    <div>
      <Navbar pageTitle="New Student" />
      <div>
        <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.parent}>
            <Avatar diameter="150px" />
            <div className={styles.child}>
              <input
                id="image_upload"
                name="image_upload"
                ref={register}
                type="file"
                accept="image/*"
                className={styles.imageInput}
              />
            </div>
          </div>

          <input
            className={styles.searchBox}
            type="text"
            placeholder="First Name..."
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <input
            className={styles.searchBox}
            type="text"
            placeholder="Last Name..."
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            className={styles.searchBox}
            type="number"
            placeholder="Age..."
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <textarea
            className={styles.textArea}
            id="textArea"
            type="text"
            placeholder="Other Info..."
            onChange={(e) => {
              setOtherInfo(e.target.value);
            }}
          />
          <button className={styles.button}>Done</button>
        </form>
      </div>
    </div>
  );
}

