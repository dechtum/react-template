// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { StockMatEditDialogHeader } from "./StockMatEditDialogHeader";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

import {
  Input,
  Select,
  Switch,
  Upload,
  SITMore,
  DatePickerField,
  Scaner,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const StockMatEditSchema = Yup.object().shape({
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

export function StockMatEditForm({
  saveStockMat,
  StockMat,
  actionsLoading,
  onHide,
  id,
}) {
  const [tempfile,setTempfiel] = React.useState('');
  const [lang,setLang] = React.useState(useLang());
  const [state, setState] = React.useState({
    active: false
  })
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }
  function handleClick(e){
    console.log(e.target.name);
    switch (e.target.name) {
      case 'group':
        
        break;
      case 'unit':
       
        break;
      case 'scaner':
      
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={StockMat}
        validationSchema={StockMatEditSchema}
        onSubmit={(values) => {
          saveStockMat(values);
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
              <Form className="form form-label-right d-flex row">
                <Card className="col-md-4 pt-3 pb-3" style={{ height: "38vh" }}>   
                  <Field
                        name="pic"
                        component={Upload}
                        tempfile={setTempfiel}
                      />  
                </Card>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <StockMatEditDialogHeader id={id} onHide={onHide} />
                  
                  <div className=" row">                    
                    <div className="col-lg-6">                     
                      <Field
                       readOnly={true}
                        name="lastName"
                        component={Input}
                        placeholder="รหัสสินค้า"
                        label="รหัสสินค้า"
                        sublabel=""
                      />
                     
                      
                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                   
                      <Field
                        readOnly={true}
                        name="userName"
                        component={Select}
                        placeholder="กลุ่มสินค้า"
                        label="กลุ่มสินค้า"
                        sublabel="เลือกกลุ่มสินค้า"
                      />
                    </div>
                  </div>
                  <div className=" row">                    
                    <div className="col-lg-6">
                          
                      <Field
                        readOnly={true}
                        name="lastName"
                        component={Input}
                        placeholder="กรอกชือสินค้า"
                        label="วัตถุดิบ"
                        sublabel=""
                      />                     
                      
                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                      
                      <Field
                        readOnly={true}
                        name="userName"
                        component={Select}
                        placeholder="หน่วย"
                        label="หน่วย"
                        sublabel="เลือกหน่วย"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                    <Field
                      readOnly={true}
                          name="lastName"
                          component={Textarea}
                          placeholder="รายละเอียด"
                          label="รายละเอียด"
                          sublabel=""
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
                  <Switch onChange={(e) => handleChange(e, 'active')} checked={state.active} />
                </div>
                <div className="ml-auto" >
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    Cancel
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    Save
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
