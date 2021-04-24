import { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { useForm } from "react-hook-form";
import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import { StringInput, InputType } from "./Interfaces";
// import DateInput from "./DateInput"
// import TextInput from "./TextInput"

export const NewEntity = (props: { textFields: StringInput[] }) => {
  const styles = require("../../styles/NewEntity.module.css");

  const [imgPreview, setImagePreview] = useState("/default-avatar.jpg");
  const [textInputs, setTextInputs] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    setTextInputs(props.textFields);
  }, []);

  // console.log(props.textFields[0].value);
  // console.log(textInputs[0].value);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    //here is where the POST request will happen
  };

  const updateImageDisplay = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validFileType(file)) {
        const imgSRC = URL.createObjectURL(file);
        setImagePreview(imgSRC);
      }
    }
  };

  const getComponent = (input: StringInput) => {
    console.log(input);
    console.log("Input: " + input);
    switch (input.type) {
      case InputType.TEXT:
        return <h1 key={input.attributeName}>Text</h1>;
      case InputType.DATE:
        return (
          <TextField
            id={input.attributeName}
            label={input.attributeName}
            key={input.attributeName}
            type="date"
            defaultValue={input.value}
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.searchBox}
            // onChange={(e) => setBirthDate(e.target.value)}
            onChange={(e) => updateInput(input.attributeName, e.target.value)}
          />
        );
    }
  };

  const updateInput = (attributeName: string, newValue: string) => {
    setTextInputs((oldInputs) =>
      oldInputs.map((oldInput) => {
        if (oldInput.attributeName === attributeName) {
          oldInput.value = newValue;
        }

        return oldInput;
      })
    );
  };

  return (
    <div>
      {textInputs.map((input: StringInput) => {
        console.log("Input before call: " + input);
        console.log(input);
        return getComponent(input);
      })}
    </div>
  );
};

const imageFileTypes = [
  "image/apng",
  "image/bmp",
  // "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  // "image/svg+xml",
  // "image/tiff",
  // "image/webp",
  // "image/x-icon"
];

const validFileType = (file) => {
  return imageFileTypes.includes(file.type);
};

export default NewEntity;
