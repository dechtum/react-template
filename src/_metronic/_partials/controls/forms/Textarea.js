import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";

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

export function Textarea({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  sublabel,
  withFeedbackLabel = true,
  customFeedbackLabel,
  ...props
}) {
  return (
    <>
      {label}
      <textarea
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          sublabel={sublabel}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
