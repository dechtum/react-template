import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";;

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control", "form-control-solid"];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function Select({ 
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  children,
  sublabel,
  ...props
}) {
  // const [field, meta] = useField(props);
  // const { touched, error } = meta;
  
  return (
    <>
      {label}
      <select
        className={getFieldCSSClasses(touched, errors)}
        {...field}
        {...props}
      >
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={errors}
          touched={touched}
          label={label}
          sublabel={sublabel}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
