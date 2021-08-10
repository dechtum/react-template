// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

// Validation schema
const PositionSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export function PositionForm({
  saveShopsCreEmp,
  ShopsCreEmp,
  actionsLoading,
  onHide,
}) {
  let tilsublabel = useLang()=='en'?"Up to 200 characters in length":"ความยาวไม่เกิน 200 ตัวอักษร";
  let tilInput = useLang()=='en'?"Position":"ตำแหน่งงาน"; 
  let tilBtnOK = useLang()=='en'?"Save":"บันทึก";
  let tilBtnCancel = useLang()=='en'?"Cancel":"ยกเลิก";

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ShopsCreEmp}
        validationSchema={PositionSchema}
        onSubmit={(values) => {
          saveShopsCreEmp(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder={tilInput}
                      label={tilInput}
                      sublabel={tilsublabel}
                    />
                  </div>                  
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                {tilBtnCancel}
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {tilBtnOK}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
