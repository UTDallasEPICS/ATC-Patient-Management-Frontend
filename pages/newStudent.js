import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "../styles/NewStudent.module.css";

export default function newStudent() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [otherInfo, setOtherInfo] = useState("");

//   let textarea = document.querySelector(".resizeTa");
//   textarea.addEventListener("keyup", () => {
//     textarea.style.height = calcHeight(textarea.value) + "px";
//   });


    const resize =  (e) => {
        console.log(e.target.value)
        e.target.style.height = calcHeight(e.target.value);
    }
  return (
    <div>
      <Navbar pageTitle="New Student" />
      <div className={styles.inputs}>
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
            setName(e.target.value);
          }}
        />
        <textarea
          className={styles.textArea}
          id="textArea"
          type="text"
          placeholder="Other Info..."
          onChange={(e) => {
            setName(e.target.value);
            resize(e)
          }}
        />
      </div>
    </div>
  );
}

const textAreaLineHeight = 20;
const textAreaPadding = 12;
const textAreaBorder = 2;

function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  console.log(numberOfLineBreaks)
  // min-height + lines x line-height + padding + border
  let newHeight = 40 + numberOfLineBreaks * textAreaLineHeight + textAreaPadding + textAreaBorder + "px";
  return newHeight;
}
