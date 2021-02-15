import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "../styles/NewStudent.module.css";
import Link from "next/link";
import Avatar from "../components/Avatar";
import { useForm } from "react-hook-form";

export default function newStudent() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [otherInfo, setOtherInfo] = useState("");

  const { register, handleSubmit } = useForm();

  const resize = (e) => {
    e.target.style.height = calcHeight(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    //here is where the POST request will happen
  };

  return (
    <div>
      <Navbar pageTitle="New Student" />
      <div >

        <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>

        <Avatar diameter="150px" />
          <input ref={register} type="file" name="profilePicture"/>

          <input
            className={styles.searchBox}
            type="text"
            placeholder="Name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className={styles.searchBox}
            type="text"
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
              resize(e);
            }}
          />
          <button className={styles.button}>Done</button>
        </form>
      </div>
    </div>
  );
}

const textAreaLineHeight = 20;
const textAreaPadding = 12;
const textAreaBorder = 2;

function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight =
    40 +
    numberOfLineBreaks * textAreaLineHeight +
    textAreaPadding +
    textAreaBorder +
    "px";
  return newHeight;
}
