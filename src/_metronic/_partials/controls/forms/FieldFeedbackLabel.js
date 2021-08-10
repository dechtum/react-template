import React from "react";

const inputLabel = ({ label, touched, error, customFeedbackLabel ,sublabel}) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  if (touched && !error && label) {
    return <div className="valid-feedback"></div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <small>{customFeedbackLabel}</small>}
      {!customFeedbackLabel && (
        <>
          <small>{sublabel}</small>
        </>
      )}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel ,sublabel}) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <small>{customFeedbackLabel}</small>}
      {!customFeedbackLabel && label && (
        <>
         <small>{sublabel}</small>
        </>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  sublabel,
  error,
  type,
  customFeedbackLabel
}) {
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel ,sublabel});
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel ,sublabel});
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel ,sublabel});
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel ,sublabel});
  }
}
