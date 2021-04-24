import { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { useForm } from "react-hook-form";
import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import { StringInput, InputType } from "./Interfaces";
import Button from "@material-ui/core/Button"
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


  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("Submit called")
    //here is where the POST request will happen
    //use the current state to fill the call body
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
    switch (input.type) {
      case InputType.TEXT:
        return (
          <TextField
            key={input.attributeName}
            id="outlined-basic"
            label={input.value}
            variant="outlined"
            className={styles.inputField}
            onChange={(e) => {
              updateInput(input.attributeName, e.target.value);
            }}
          />
        );

      case InputType.DATE:
        return (
          <TextField
            id={input.attributeName}
            label={input.name || input.attributeName}
            key={input.attributeName}
            type="date"
            defaultValue={input.value}
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.inputField}
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
    <form className={styles.inputs} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.parent}>
              <Avatar diameter="175px" img={imgPreview} />

              <div className={styles.child}>
                <label
                  htmlFor="image_upload"
                  className={styles.imageInputLabel}
                >
                  <strong>Upload Picture (Optional)</strong>
                </label>
                <input
                  id="image_upload"
                  name="image_upload"
                  ref={register}
                  type="file"
                  accept="image/*"
                  className={styles.imageInput}
                  onChange={updateImageDisplay}
                />
              </div>
            </div>

      <div className={styles.textInputs}>
        {textInputs.map((input: StringInput) => {
          return getComponent(input);
        })}
      </div>
      <Button variant="contained" color="primary" type="submit">Submit</Button>
    </form>
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
