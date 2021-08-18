// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLang, setLanguage } from "../../../../../../_metronic/i18n";
import {
  Input,
  Select,
  DatePickerField,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const SaleProductEditSchema = Yup.object().shape({
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

export function SaleProductEditForm({
  saveSaleProduct,
  SaleProduct,
  actionsLoading,
  onHide,
}) {
  const [lang,setLang]=React.useState(useLang())
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={SaleProduct}
        validationSchema={SaleProductEditSchema}
        onSubmit={(values) => {
          saveSaleProduct(values);
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
                      name="group_name"
                      component={Input}
                      placeholder={lang=='en'?'Name':"ชื่อกลุ่มสินค้า"}
                      label={lang=='en'?'Name':"ชื่อกลุ่มสินค้า"}
                    />
                  </div>
                               
                </div>
                <div className="form-group row">
                  
                  <div className="col-lg-12">
                    <Field
                      name="group_detail"
                      component={Textarea}
                      placeholder={lang=='en'?'Discription':"รายละเอียด"}
                      label={lang=='en'?'Discription':"รายละเอียด"}
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
               {lang=='en'?'Cancel':'ยกเลิก'} 
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                {lang=='en'?'Save':'บันทึก'}
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
