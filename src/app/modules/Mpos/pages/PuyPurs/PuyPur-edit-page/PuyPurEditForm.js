// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Card, Modal, Tab, Tabs } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PuyPurEditDialogHeader } from "./PuyPurEditDialogHeader";
import { Tab1,Tab2,Tab3 } from "./tab/index";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

import {
  Input,
  Select,
  Switch,
  Upload,
  SITMore,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const PuyPurEditSchema = Yup.object().shape({
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

export function PuyPurEditForm({
  savePuyPur,
  PuyPur,
  actionsLoading,
  onHide,
  id,
}) {
  let btnOk = useLang() == 'en'?'Save':'บันทึก';
  let btnCancel = useLang() == 'en'?'Cancel':'ยกเลิก';
  let tab1 = useLang() == 'en'?'Purchase Order':'ใบสั่งซื้อ';
  let tab2 = useLang() == 'en'?'Receipt':'ใบรับสินค้า';
  let tab3 = useLang() == 'en'?'Payment':'ใบสำคัญจ่าย';
  const [tempfile,setTempfiel] = React.useState('');
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
        initialValues={PuyPur}
        validationSchema={PuyPurEditSchema}
        onSubmit={(values) => {
          savePuyPur(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="row">
            <Modal.Body className="overlay overlay-block cursor-default pt-0">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">  
                <Tabs>
                    <Tab eventKey="Tab1" title={tab1} >
                      <PuyPurEditDialogHeader lbl={tab1}  id={id} onHide={onHide} />
                      <Tab1 id={id} onHide={onHide} />
                      
                    </Tab>
                    <Tab eventKey="Tab2" title={tab2}>
                      <PuyPurEditDialogHeader lbl={tab2} id={id} onHide={onHide} />
                      <Tab2 id={id} onHide={onHide} />
                    </Tab>
                    <Tab eventKey="Tab3" title={tab3}>
                      <PuyPurEditDialogHeader lbl={tab3} id={id} onHide={onHide} />
                     
                    </Tab>
                  </Tabs>         
                 
              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3" >
              <Card style={{width:'100%'}} className="p-3">
              <div className="d-flex" style={{width:'100%'}}>
                <div
                  className="mr-auto "
                >
                  <Switch onChange={(e) => handleChange(e, 'active')} checked={state.active} />
                </div>
                <div className="ml-auto" >
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    {btnCancel}
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    {btnOk}
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
