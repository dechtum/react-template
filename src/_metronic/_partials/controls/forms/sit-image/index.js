import React from "react";
import {FieldFeedbackLabel} from "../FieldFeedbackLabel";
import { Button, Card, Jumbotron, Modal, ProgressBar, InputGroup, FormControl, Image } from "react-bootstrap";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function SITImage({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  sublabel,
  withFeedbackLabel = true,
  customFeedbackLabel,
  ...props
}) {
  return (
    <Jumbotron>
                {field.value=="" || field.value == undefined
                ?<span >
                    <h1>ภาพประกอบ</h1>
                        <p>
                            เลือกรูปภาพที่ต้องการ
                            และกดอัพโหลด                            
                        </p>
                </span>
                :<Image {...field} {...props}  thumbnail /> 
                }
    </Jumbotron>
  
  );
}
