// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ServiceAlEditDialogHeader } from "./ServiceAlEditDialogHeader";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

import {
  Input,
  Select,
  Switch,
  DatePickerField,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ServiceAlEditSchema = Yup.object().shape({
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

export function ServiceAlEditForm({
  saveServiceAl,
  ServiceAl,
  actionsLoading,
  onHide,
  id,
}) {
  const [lang,setLang]=React.useState(useLang())
  const [state, setState] = React.useState({
    active: false
  })
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ServiceAl}
        validationSchema={ServiceAlEditSchema}
        onSubmit={(values) => {
          saveServiceAl(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="row" >
            <Modal.Body className="overlay overlay-block cursor-default col-12">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right row">
                <Card className="col-md-12" aria-labelledby="example-modal-sizes-title-lg">
                  <ServiceAlEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row pt-2">                    
                    <div className="col-lg-6">
                      <Field
                        name="company_name"
                        component={Input}
                        disabled
                        placeholder={lang=='en'?'company name':'แสดงชือบริษัท'}
                        label={lang=='en'?'Company/Store':'บริษัท / ร้านค้า'}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="emp_name"
                        disabled
                        component={Input}
                        placeholder={lang=='en'?'informer name':'แสดงชือผู้แจ้ง'}
                        label={lang=='en'?'informer':'ผู้แจ้ง'}
                      />
                    </div>
                  </div>
                  <div className="form-group row">                    
                    <div className="col-lg-12">
                      <Field
                        name="title"
                        component={Input}
                        placeholder={lang=='en'?'Subject':'เรื่อง'}
                        label={lang=='en'?'Subject':'เรื่อง'}
                      />
                    </div>                   
                  </div>
                  <div className="form-group row">                    
                    <div className="col-lg-12">
                      <Field
                        name="detial"
                        rows={6}
                        component={Textarea}
                        placeholder={lang=='en'?'Description':'รายละเอียด'}
                        label={lang=='en'?'Description':'รายละเอียด'}
                      />
                    </div>                   
                  </div>
                </Card>
              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3" >
              <Card style={{width:'100%'}} className="p-3">
              <div className="d-flex" style={{width:'100%'}}>
                <div
                  className="mr-auto "
                >
                  <Switch onChange={(e) => handleChange(e, 'active')} lang={lang} checked={state.active} />
                </div>
                <div className="ml-auto" >
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
                </div>
              </div>
              </Card>

            </Modal.Footer>
          </div>
        )}
      </Formik>
    </>
  );
}
