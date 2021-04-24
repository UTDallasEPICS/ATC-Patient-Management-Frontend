import { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { useForm } from "react-hook-form";
import Head from "next/head";
import TextField from "@material-ui/core/TextField";
import { TextInput, InputType } from "./Interfaces";

export const NewEntity = (props: { textFields: TextInput[] }) => {
  const styles = require("../../styles/NewEntity.module.css");

  const [imgPreview, setImagePreview] = useState("/default-avatar.jpg");
  const [textInputs, setTextInputs] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    setTextInputs(props.textFields);
  }, []);

  // console.log(props.textFields[0].displayValue);
  // console.log(textInputs[0].displayValue);

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

  const getComponent = (input: TextInput) => {
    switch(input.type){
      case InputType.TEXT:
        return <h1>Text</h1>
      case InputType.DATE: 
        return <h1>Date</h1>
    }
  }

  return (
    <div>
      {textInputs.map((input) => {
        return (
          getComponent(input)
        );
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
